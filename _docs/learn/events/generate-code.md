---
title: Generate Code
search_title: Generate Code
category: learn-events
order: 3
---

Let's generate some code and review it.

    ❯ jets generate:event cool --trigger scheduled
          create  app/events/application_event.rb
          create  app/events/cool_event.rb

The generate code looks like this:

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  rate "10 hours"
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

**Note**: The method name does not have to be `handle`, it can be anything. For Jobs, Jets will create a distinct Lambda function for each public method.

The `rate` macro-like method tells Jets to create an Amazon EventBridge rule (formerly called CloudWatch Event Rules and Scheduled Expressions) that runs the `handle` method below it on a schedule. Basically, the `CoolEvent#handle` Lambda function will run every 10 hours.

You can use [cron](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html) or [rate](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html) expressions.  Examples:

```ruby
cron "0 */12 * * ? *" # every 12 hours
rate "10 hours" # every 10 hours
```

## Other Event Triggers

**Tip**: You can use the `--trigger` option to generate Jobs with supported event triggers. Example:

    jets generate:event cool --trigger sns

Here are some other supported event triggers:

* [dynamodb]({% link _docs/events/dynamodb.md %})
* [iot]({% link _docs/events/iot.md %})
* [kinesis]({% link _docs/events/kinesis.md %})
* [log]({% link _docs/events/cloudwatch-log.md %})
* [rule]({% link _docs/events/cloudwatch-rule.md %})
* [s3]({% link _docs/events/s3.md %})
* [scheduled]({% link _docs/events/scheduled.md %})
* [sns]({% link _docs/events/sns.md %})
* [sqs]({% link _docs/events/sqs.md %})

For more info: `jets generate:event -h`. Also, see the [Events Docs]({% link _docs/events.md %}) for more info.

Next, we'll test the job locally.
