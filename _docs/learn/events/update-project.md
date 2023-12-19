---
title: Update Project
search_title: Update Project Job
category: learn-events
order: 9
---

{% include learn/update-project-lambda-console-edit.md framework="events" %}

## Change CloudWatch Event Rule

Instead of clicking **Test**, we'll manually change the CloudWatch Event Rule to ensure it works properly. A quick way to find the CloudWatch Event Rule is from the CloudFormation stack.

![](https://img.boltops.com/tools/jets/learn/events/review-deploy-cloudformation-console.png)

You can click on the Physical ID of the CloudWatch Event Rule, and it'll take you to the EventBridge console.

![](https://img.boltops.com/tools/jets/learn/events/update-project-eventbridge-console.png)

The code we deploy sets a rate of 10 hours. Let's change it to 1 minute.

![](https://img.boltops.com/tools/jets/learn/events/update-project-eventbridge-console-edit.png)

You can leave the other settings the same, click **Next** a few times, and click on **Update Rule** to save the changes.

## Jets Logs

You can also use the [jets logs]({% link _reference/jets-logs.md %}) command to tail the logs in your terminal.

    ❯ jets logs -f -n cool_event-handle
    Tailing logs for /aws/lambda/events-dev-cool_event-handle
    Do something with event {"version":"0","id":"da26e5b9-b309-7453-27ec-f06151d6c714","detail-type":"Scheduled Event","source":"aws.events","account":"536766270177","time":"2024-05-22T22:27:52Z","region":"us-west-2","resources":["arn:aws:events:us-west-2:536766270177:rule/events-dev-CoolEvent-SP6VXAKRGCRJ-HandleEventsRule-9N43Z0vWJNpz"],"detail":{}}

We specify the `-n` option for the [jets logs]({% link _reference/jets-logs.md %}) command.  You can use `jets functions` to list available functions.

## Update Code and Deploy Changes

So far, we have been making manual changes. We should codify the changes. To help see the changes, let's make some additional changes so that it's easy to check.

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  rate "2 minutes"
  def handle
    puts "debug 2"
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

{% include learn/update-project-deploy-again.md framework="events" %}
