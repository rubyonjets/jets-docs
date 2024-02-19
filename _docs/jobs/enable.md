---
title: "Jets Job Enabling"
nav_text: Enable
category: jobs
order: 1
desc: How to Enable Jets Jobs.
---

To enable Jets Job you configure 2 things:

1. Jets Job ActiveJob Adapter: `config.active_job.queue_adapter = :jets_job`
2. Jets SQS Queue and Lambda Worker: `config.job.enable = true`

## Jets Job ActiveJob Adapter

Jets provides a `jets_job` ActiveJob adapter that queues jobs to SQS. To enable it:

config/environments/production.rb

```ruby
Rails.application.configure do
  config.active_job.queue_adapter = :jets_job
end
```

## Jets SQS Queue and Lambda Worker

A SQS Queue and Job Processor (Lambda) is created upon jets deployment. To enable it:

config/jets/project.rb

```ruby
Jets.project.configure do
  config.job.enable = true
end
```

This creates:

1. The SQS Queue to store the jobs
2. The Lambda Function that listens to Queue events and processes the jobs

AWS Lambda scales automatically to process the queue.
