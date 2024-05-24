---
title: "Jets Job Multiple Queues"
nav_text: Multiple Queues
category: jobs
order: 3
desc: How to create and use multiple queues.
---

## Deploy Multiple Queues

To have Jets deploy and create multiple Queue

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.job.enable = true

  config.job.default_queue.lambda.reserved_concurrency = 5

# Add additional queues. Note: default queue is always created
  config.job.additional_queues = %w[urgent low_priority]

  # Adjust settings for each queue
  config.job.queues.low_priority.lambda.reserved_concurrency = 2
  config.job.queues.urgent.lambda.memory_size = 2048
  config.job.queues.urgent.lambda.reserved_concurrency = 10
end
```

This creates 2 additional queues. The default queue is always created. In the example, there'll be 3 queues.

    default urgent low_priority

Each queue has its own Lambda Function for processing.  This allows you to individually control settings like `reserved_concurrency` and `memory_size`.  You can manually use `jets concurrency:set` to tune the concurrency and then codify the settings.

## Example Job with Queue

Here's an example job

app/jobs/mailman_job.rb

```ruby
class MailmanJob < ApplicationJob
  queue_as :urgent

  def perform(*args)
    puts "Delivering: #{args}"
  end
end
```

When you call the job, it will send it to the specific SQS queue.

    $ rails console
    > MailmanJob.perform_later("mail") # => urgent queue
    > MailmanJob.set(queue: "low_priority").perform_later("candy") # => low_priority queue

{% include reference/config/header.md %}
{% include reference/config/deploy/job.md %}
{% include reference/config/footer.md %}
