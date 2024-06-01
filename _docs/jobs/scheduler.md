---
title: "Jets Job Scheduler"
nav_text: Scheduler
category: jobs
subcategory: jobs-scheduler
order: 2
desc: How to Schedule Jobs with schedule.yml.
---

Jets supports a Job Scheduler with `scheduler.yml` that is similar to [sidekiq-scheduler](https://github.com/sidekiq-scheduler/sidekiq-scheduler).

## Enabling

The Jets scheduler is enabled by default.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.scheduler.enable = true # default true
  # config.scheduler.translate.on_deploy = true # default true
end
```

* You create a `config/jets/scheduler.yml` with schedule items. Jets will create CloudWatch rules resources that correspond to the scheduled items.
* Also, if the project has a `config/sidekiq.yml` with a schedule key, Jets automatically translates that to a `config/jets/scheduler.yml` upon deployment. See: [Scheduler Translate]({% link _docs/jobs/scheduler/translate.md %})
* The `config/jets/scheduler.yml` will take high precedence if both it and `config/sidekiq.yml` exists.

## Example

Here's an example

config/jets/scheduler.yml

```yaml
GreetingJob:
  rate: "1 minute"

cleanup_job_desk:
  rate: "12 hours"
  class: CleanupJob
  args: ["desk", "room"]
  splat_args: true
```

When the `config/jets/scheduler.yml` exists, Jets uses it to create the scheduler components upon `jets deploy`, IE: Scheduled Events and Lambda functions.

## How It Works

The `schedule.yml` will create `jets/schedule_event.rb` code upon deployment to something like this:

app/events/jets/schedule_event.rb

```ruby
class Jets::ScheduleEvent < Jets::Event::Base
  class_timeout 15.minutes.to_i
  rate "1 minute"
  def greeting_job
    GreetingJob.perform_later
  end
  rate "12 hours"
  def cleanup_job_desk
    CleanupJobDesk.perform_later("desk","room")
  end
end
```

Each method in the class creates a distinct Lambda function that handles the processing. The `rate` expressions create AWS Scheduled Events. AWS manages the scheduler for you. It's "serverless". The resources are deployed as part of the `*JetsScheduleEvent*` nested stack.

## Expressions Support

Both the `rate` and `cron` expressions are supported.

{% include events/schedule-expressions.md %}

## Notes

* The only required field is a scheduling expression field, IE: `rate` or `cron`.
* The class name can be inferred by the top-level key or explicitly by the `class` field. Example: `GreetJob` (inferred) and `class: CleanupJob` (explicit).
* The `args` field is optional. If you need the args to be splatted, you can use `splat_args: true`. This removes the `[]` brackets for Array arguments and `{}` brackets for Hash arguments.
* An interesting note: The CloudWatch Schedule Event Rule triggers a Jets ScheduledEvent Lambda function that calls your Job's `perform_later` method, which writes to the Jets Queue. Each Jets Queue's Lambda function handles the processing.
