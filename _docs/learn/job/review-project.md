---
title: Review Project
search_title: Review Project Job
category: learn-job
order: 4
---

Let's explore the project code and write some app code.

## ApplicationJob

The starter project comes with an `ApplicationJob`. It looks like this:

app/jobs/application_job.rb

```ruby
class ApplicationJob < Jets::Job::Base
  # Adjust to increase the default timeout for all Job classes
  class_timeout 60
end
```

In general, all of your jobs will inherit from this `ApplicationJob`.

## Create a Job

Let's create some code that does some work. We'll generate some starter code again.

    ❯ jets generate job hard
        create  app/jobs/hard_job.rb

The generate code looks like this:

app/jobs/hard_job.rb

```ruby
class HardJob < ApplicationJob
  rate "10 hours"
  def perform
    puts "Do something with event #{event}"
  end
end
```

**Note**: The method name does not have to be `perform`, it can be anything. For Jobs, Jets will create a distinct Lambda function for each public method.

The `rate` macro-like method tells Jets to create an Amazon EventBridge rule (formerly called CloudWatch Event Rules and Scheduled Expressions) that runs the `perform` method below it on a schedule.  Bascially, the `HardJob#perform` Lambda function will run every 10 hours.

You can use [cron](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html) or [rate](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html) expressions.  Examples:

```ruby
cron "0 */12 * * ? *" # every 12 hours
rate "10 hours" # every 10 hours
```

**Tip**: You can use the `--type` option to generate Jobs with different events type. Example:

    jets generate job hard --type sns

Some supported event types: dynamodb iot kinesis log rule s3 scheduled sns sqs. For more info: `jets generate job -h`. Also, see the [Events Docs]({% link _docs/events.md %}) for more info.

Next, we'll test the job locally.