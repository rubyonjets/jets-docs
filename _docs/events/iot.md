---
title: IoT Events
categories: events
order: 4
---

Jets supports [IoT Events](https://aws.amazon.com/iot-events/). This allows you to have a Lambda function run when IoT data is received.  You provide a SQL statement to define an [IoT Topic Rule](https://docs.aws.amazon.com/iot/latest/developerguide/iot-rules.html).  You can access the data via `event`.

<div class="video-box"><div class="video-container"><iframe src="https://www.youtube.com/embed/peNzpJ3HrH4" frameborder="0" allowfullscreen=""></iframe></div></div>

## IoT Overview

![](/img/docs/iot-diagram.png)

## Simple Form

Generate code.

    jets generate job thermostat --type iot --name measure

It looks something like this.

app/jobs/thermostat_job.rb

```ruby
class ThermostatJob < ApplicationJob
  iot_event "SELECT * FROM 'my/topic'"
  def measure
    puts "event #{JSON.dump(event)}"
  end
end
```

At a minimum, you need to define the SQL statement to use query the Topic Rule. This is the simplest and recommended form.

The `iot_event` declaration creates an [AWS::IoT::TopicRule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html). You can find it in the IoT console under "Message routing/Rules":

![](https://img.boltops.com/tools/jets/events/iot/iot-topic-rules.png)

Here's the rule details page:

![](https://img.boltops.com/tools/jets/events/iot/iot-topic-rule-show-view.png)

## Complete Form: Control with Different Argument Types

If you need more control, you can also set any of the properties of the `topic_rule_payload` by providing a hash.

```ruby
class ThermostatJob < ApplicationJob
  iot_event(sql: "SELECT * FROM 'my/topic'")
  def record
    puts "event #{JSON.dump(event)}"
  end
end
```

For even more control, you can provide a hash that has a `topic_rule_payload` key. This will provide you full control over the properties passed to the [AWS::IoT::TopicRule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iot-topicrule.html) resource.

```ruby
class ThermostatJob < ApplicationJob
  iot_event(topic_rule_payload: {sql: "SELECT * FROM 'my/topic'"})
  def act
    puts "event #{JSON.dump(event)}"
  end
```

## Tailing Logs

It helps to tail the logs and watch the event as it comes through.

    jets logs -f -n thermostat_job-record

## Event Payloads

The event payload received is whatever is sent by the device to [MQTT]( https://docs.aws.amazon.com/iot/latest/developerguide/view-mqtt-messages.html).  You can test in the MQTT console.

![](/img/docs/mqtt-client.png)

You can also test with the [aws iot-data publish](https://docs.aws.amazon.com/cli/latest/reference/iot-data/publish.html) cli. Note, you have to base64 encode the payload data. Example:

    aws iot-data publish --topic my/topic --payload $(echo '{"message": "test"}' | base64)



You should see the data in the Lambda function's CloudWatch logs.

![](/img/docs/iot-cloudwatch-log.png)

