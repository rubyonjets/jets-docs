---
title: Review Project
search_title: Review Project Job
category: learn-job
order: 4
---

{% include videos/learn/getting-started/job.md %}

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

Generally, your jobs will inherit from this `ApplicationJob`.

## Create a Job

Let's create some code that does some work. We'll use a generator again.

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

The `rate` macro-like method tells Jets to create an Amazon EventBridge rule (formerly called CloudWatch Event Rules and Scheduled Expressions) that runs the `perform` method below it on a schedule. Basically, the `HardJob#perform` Lambda function will run every 10 hours.

You can use [cron](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html) or [rate](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html) expressions.  Examples:

```ruby
cron "0 */12 * * ? *" # every 12 hours
rate "10 hours" # every 10 hours
```

## Other Event Types

**Tip**: You can use the `--type` option to generate Jobs with supported event types. Example:

    jets generate job hard --type sns

Here are some other supported event types:

* [dynamodb]({% link _docs/events/dynamodb.md %})
* [iot]({% link _docs/events/iot.md %})
* [kinesis]({% link _docs/events/kinesis.md %})
* [log]({% link _docs/events/cloudwatch-log.md %})
* [rule]({% link _docs/events/cloudwatch-rule.md %})
* [s3]({% link _docs/events/s3.md %})
* [scheduled]({% link _docs/events/scheduled.md %})
* [sns]({% link _docs/events/sns.md %})
* [sqs]({% link _docs/events/sqs.md %})

For more info: `jets generate job -h`. Also, see the [Events Docs]({% link _docs/events.md %}) for more info.

Next, we'll test the job locally.
