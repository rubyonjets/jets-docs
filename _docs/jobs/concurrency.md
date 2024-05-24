---
title: "Jets Job Concurrency"
nav_text: Concurrency
category: jobs
order: 4
desc: How to adjust Job concurrency settings.
---

## Reserved Concurrency Settings

You can adjust concurrency settings for each queue. example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.job.enable = true

  config.job.default_queue.lambda.reserved_concurrency = 5

  # Add additional queues. Note: default_queue is always created
  config.job.additional_queues = %w[urgent low_priority]

  # Adjust settings for each queue
  config.job.queues.low_priority.lambda.reserved_concurrency = 2
  config.job.queues.urgent.lambda.reserved_concurrency = 10
end
```

You can fine tune how many Lambda function instances you want to handle processing for each queue.

**Note**: The `config.job.default_queue` has a separate path that different than the additional queue config keys.

## Concurrency Cheatsheet

Also, this might be helpful. This shows you how to control concurrency the lambda functions like `jets-default_queue_event-handle` manually.

    jets concurrency:info
    jets concurrency:get -n jets-default_queue_event-handle
    jets concurrency:set -n jets-default_queue_event-handle --reserved 20

**Note**: Use things command set the concurrency outside of the `jets deploy` lifecyle. It's akin to making manually changes to on a server. The next `jets deploy` may overwrite any manual changes.

## Example CLI Session

    ❯ jets concurrency:get -n jets-urgent_queue_event-handle
    Settings for Function: rails-dev-jets-urgent_queue_event-handle
    Reserved concurreny: 22
    Provisioned concurrency: not set

    ❯ jets concurrency:set -n jets-urgent_queue_event-handle --reserved 200
    Will update the concurrency settings for rails-dev-jets-urgent_queue_event-handle
    Are you sure? (y/N) y
    Updating concurrency settings for rails-dev-jets-urgent_queue_event-handle
    Set reserved concurrency to 200

    ❯ jets concurrency:get -n jets-urgent_queue_event-handle
    Settings for Function: rails-dev-jets-urgent_queue_event-handle
    Reserved concurrency: 200
    Provisioned concurrency: not set

    ❯ jets concurrency:info
    Concurrency for rails-dev
    +--------------------------------------+----------+
    |               Function               | Reserved |
    +--------------------------------------+----------+
    | controller                           | 25       |
    | jets-default_queue_event-handle      | 5        |
    | jets-low_priority_queue_event-handle | 2        |
    | jets-prewarm_event-handle            | 2        |
    | jets-urgent_queue_event-handle       | 200      |
    | total                                | 234      |
    +--------------------------------------+----------+
    Account Limits
      Concurrent Executions: 1000
      Unreserved Concurrent Executions: 428
