---
title: Associated Function Resources
nav_text: Function Resources
category: custom
subcategory: custom-function-resources
order: 2
---

As explained in the [Core Resource Model](http://rubyonjets.com/docs/core-resource/) docs, methods like `rate` and `cron` perform some wrapper logic and ultimately call the `resource` method. We'll cover that wrapper logic and expansion process in more detail here.

The `rate` method creates a CloudWatch Event Rule resource. This Event Rule resource is associated with the `party` Lambda function. Here's the example again:

```ruby
class CoolEvent < ApplicationJob
  rate "10 hours" # every 10 hours
  def party
    puts "party hardy"
  end
end
```

What happens is that Jets takes the `rate` method, performs some wrapper logic, and calls the core `resource` method in the first pass. The code looks something like this after the first pass:

```ruby
class CoolEvent < ApplicationJob
  resource(
    "{namespace}EventsRule": {
      Type: "AWS::Events::Rule",
      Properties: {
        ScheduleExpression: "rate(10 hours)",
        State: "ENABLED",
        Targets: [{
          Arn: "!GetAtt {namespace}LambdaFunction.Arn",
          Id: "{namespace}RuleTarget"
        }]
      }
    }
  )
  def party
    puts "party hardy"
  end
end
```

In the second pass, Jets replaces the `{namespace}` placeholder with an identifier, a value with a method name representing the Lambda function. For example:

Before | After
--- | ---
{namespace} | Party

It does this because the resolved values are not known until later in the processing. IE: The `party` method is defined below and after the `resource` DSL call.

The final code looks something like this:

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

The `resource` method creates the [AWS::Events::Rule](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-rule.html) as a CloudFormation resource. The keys of the Hash structure use the underscore format following the Ruby naming convention. As part of CloudFormation template processing, the underscored keys are camelized.

Understanding the core `resource` model is key to unlocking the power of full customization with Jets. Once you get used to the `resource` method, you could start defining your custom convenience resource methods that wrap the `resource` method for more concise code as [Associated Resources Extensions]({% link _docs/custom/function-resources/function-resources-extensions.md %}).

{% include custom/camelcase-note.md %}
