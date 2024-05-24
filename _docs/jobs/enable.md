---
title: "Jets Job Enabling"
nav_text: Enable
category: jobs
order: 1
desc: How to Enable Jets Jobs.
---

To enable Jets Job you configure 2 things:

1. Jets SQS Queue and Lambda Worker: `config.job.enable = true`
2. Jets Job ActiveJob Adapter: `config.active_job.queue_adapter = :jets_job`

## Jets SQS Queue and Lambda Worker

A SQS Queue and Job Processor (Lambda) is created upon jets deployment.

{% include job/enable.md %}

## Example Job

Here's an example job

app/jobs/cleanup_job.rb

```ruby
class CleanupJob < ApplicationJob
  def perform(*args)
    puts "Cleaning up: #{args}"
  end
end
```

## Jets Deploy

That gives you enough to deploy.

    jets deploy

When you deploy a Jets app, it'll create an SQS Queue and a `jets-queue_event-handle` Lambda function to handle the Jets jobs processing. It looks something like this:

![](https://img.boltops.com/tools/jets/jobs/cloudformation-deployed-sqs-queue.png)

## Test Jets Job SQS Queue

To test the Jets Job and confirm it's using the SQS queue, you can either use `RAILS_ENV=production rails console` or also configure your Rails `development.rb` settings to use the `:jets_job` adapter also. Example:

config/environment/development.rb

```ruby
Rails.application.configure do
  config.active_job.queue_adapter = :jets_job
end
```

When you call the job, it will send it to the deployed SQS queue.

    $ rails console
    > CleanupJob.perform_later("desk")

It gets added to the SQS Queue and immediately processed by the Lambda function. You can see the work being process via the logs.

    $ jets logs -f -n jets-queue_event-handle
    Cleaning up: desk

**Tip**: If you need to remember the Lambda function name, you can use the `jets functions` command to find it.

## Jets Job IAM

When `config.job.enable = true`, Jets will automatically adds the necessary SQS IAM permission so that your Lambda functions can send messages to the SQS queue that Jets creates as part of deployment.

{% include reference/config/header.md %}
{% include reference/config/deploy/job.md %}
{% include reference/config/footer.md %}
