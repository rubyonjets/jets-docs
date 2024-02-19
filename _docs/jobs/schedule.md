---
title: "Jets Job Scheduler"
nav_text: Scheduler
category: jobs
order: 2
desc: How to Schedule Jobs with schedule.yml.
---

Jets supports a Job Scheduler with `scheduler.yml` that is different but similar to [sidekiq-scheduler](https://github.com/sidekiq-scheduler/sidekiq-scheduler).

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

When the `config/jets/scheduler.yml` exists, Jets uses it create the scheduler components upon `jets deploy`, IE: Scheduled Events and Lambda functions.

## How It Works

The `schedule.yml` is translated to `jets/schedule_event.rb` code upon deployment to something like this:

app/events/jets/schedule_event.rb

```ruby
class Jets::ScheduleEvent < Jets::Event::Base
  class_timeout 15.minutes.to_i
  rate "1 minute"
  def greeting_job
    GreetingJob.perform_now
  end
  rate "12 hours"
  def cleanup_job_desk
    CleanupJobDesk.perform_now("desk","room")
  end
end
```

The `rate` expressions create AWS Scheduled Events. AWS manages the scheduler for you. It's "serverless".

Each method in the class creates a distinct lambda function which will handle the processing.

## Expressions Support

Both the `rate` and `cron` expressions are supported.

{% include events/scheduled-expressions.md %}

## Notes

* The only required field is an scheduling expression field, IE: `rate` or `cron`.
* The class name can be inferred by the top-level key or explicitly by the `class` field. Example: `GreetJob` (inferred) and `class: CleanupJob` (explicit).
* The `args` field is optional. If you need the args to be splatted, you can use `splat_args: true`. This removes the `[]` brackets for Array arguments and `{}` brackets for Hash arguments.
