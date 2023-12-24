---
title: Scheduled Events
categories: events
order: 1
---

Jets supports [Scheduled Events](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html). This allows you to have a Lambda function run on a scheduled based. The scheduled event is a Amazon EventBridge rule.

## Example

Generate code.

    jets generate job hard --type scheduled

It looks something like this.

app/jobs/hard_job.rb

```ruby
class HardJob < ApplicationJob
  rate "10 hours"
  def perform
    puts "Do something with event #{event}"
  end
end
```

You can use [cron-like expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html)

    cron(0 12 * * ? *)            # runs every day at 12:00pm UTC
    cron(5,35 14 * * ? *)         # runs every day, at 2:05pm and 2:35pm UTC
    cron(15 10 ? * 6L 2019-2022)  # runs at 10:15am UTC on the last Friday of
                                  # each month during the years 2019 to 2022

**Note**: The AWS Cron syntax is slightly different from the Linux cron syntax.

You can also use [rate expresions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html)

    rate(1 minute)
    rate(5 minutes)
    rate(1 hour)
    rate(1 day)

**Note**: Notice the singular 1 minute vs plural 5 minutes. It matters.

## Tailing Logs

It helps to tail the logs and watch the event as it comes through.

    jets logs -f -n hard_job-perform

## Event Payloads

The event payload from the Scheduled Event is pretty simple.

### event

```json
{
  "version": "0",
  "id": "3a0b6d51-b30a-7d45-1468-acc58fff5558",
  "detail-type": "Scheduled Event",
  "source": "aws.events",
  "account": "1122334455",
  "time": "2023-12-24T15:48:05Z",
  "region": "us-west-2",
  "resources": [
    "arn:aws:events:us-west-2:1122334455:rule/demo-dev-HardJob-1VH3QUF-HardJobPerformEventsRule-X2ZUwbcS7f5J"
  ],
  "detail": {}
}
```

