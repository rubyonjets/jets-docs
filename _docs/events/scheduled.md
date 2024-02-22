---
title: Scheduled Events
categories: events
order: 1
---

Jets supports [Scheduled Events](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html). This allows you to have a Lambda function run on a scheduled based. The scheduled event is a Amazon EventBridge rule.

## Example

Generate code.

    jets generate:event cool --trigger scheduled

It looks something like this.

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  rate "10 hours"
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

{% include events/schedule-expressions.md %}

## Tailing Logs

It helps to tail the logs and watch the event as it comes through.

    jets logs -f -n cool_event-handle

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
    "arn:aws:events:us-west-2:1122334455:rule/demo-dev-CoolEvent-1VH3QUF-CoolEventPerformEventsRule-X2ZUwbcS7f5J"
  ],
  "detail": {}
}
```

