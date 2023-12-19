---
title: Core Resource Model
category: custom
order: 1
---

At the core of Jets is the resource model. Understanding the core `resource` model and method will allow you to create any AWS resource with Jets and CloudFormation.

## All Paths Lead to resource

An important learning point is that all resources associated with each Lambda function in Jets are ultimately created by the `resource` method. The `resource` method is the key.

For example, the `rate` method creates a CloudWatch Event Rule resource. This Event Rule resource is associated with the `party` Lambda function. Here's an example:

```ruby
class CoolEvent < ApplicationJob
  rate "10 hours" # every 10 hours
  def party
    puts "party hardy"
  end
end
```

What happens is that Jets takes the `rate` method, performs some wrapper logic, and calls the core `resource` method. In other words, the code could also be written like so:

```ruby
class CoolEvent < ApplicationJob
  resource(
    DigEventsRule: {
      Type: "AWS::Events::Rule",
      Properties: {
        ScheduleExpression: "rate(10 hours)",
        State: "ENABLED",
        Targets: [{
          Arn: "!GetAtt DigLambdaFunction.Arn",
          Id: "DigRuleTarget"
        }]
      }
    }
  )
  def party
    puts "party hardy"
  end
end
```

The `resource` method creates the AWS [AWS::Events::Rule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-rule.html) resource.

The Jets design allows you to create any AWS resource you wish. The key is understanding the `resource` method. Methods like `rate,` `cron,` and `rule_event` run some setup logic and call the `resource` method.

{% include custom/camelcase-note.md %}
