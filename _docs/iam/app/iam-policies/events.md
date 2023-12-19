---
title: IAM Policies Jets Events
nav_text: Events
category: iam-policies
order: 5
---

{% include iam/precedence.md %}

## Function specific IAM policy

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  iam_policy("sns", "s3")
  rate "10 hours"
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

## Class-wide IAM policy

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  class_iam_policy(
    "dynamodb",
    {
      Action: ["kinesis:*"],
      Effect: "Allow",
      Resource: "*",
    }
  )
end
```

## Application-Wide IAM policy

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.lambda.iam.policy = ["logs"]
end
```

{% include functions/controllers-vs-events.md type="IAM Policies" %}

## IAM Policies Inheritance

IAM policies defined at lower levels of precedence **inherit** and include the policies from the higher levels of precedence. This is done so you do not have to duplicate your IAM policies when you only need to add simple additional permissions. For example, the default application-wide IAM policy looks something like this:

```ruby
[{
  Action: ["logs:*"],
  Effect: "Allow",
  Resource: "arn:aws:logs:REGION:123456789:log-group:/aws/lambda/demo-dev-*",
}]
```

When you add a function-specific IAM policy to a method:

```ruby
class CoolEvent < ApplicationEvent
  iam_policy("s3")
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

The resulting policy for the method will look something like this:

```ruby
[{
  Action: ["logs:*"],
  Effect: "Allow",
  Resource: "arn:aws:logs:REGION:123456789:log-group:/aws/lambda/demo-dev-*",
},{
  Action: ["s3:*"],
  Effect: "Allow",
  Resource: "*",
}]
```

So the IAM policies are **additive**.

## IAM DSL Multiple Calls

When you call `iam_policy` multiple times, it appends permissions for that specific function. Example:

```ruby
iam_policy("s3")
iam_policy("sns")
```

The same as:

```ruby
iam_policy("s3", "sns")
```

## IAM Policy Definition Styles

You might have noticed that the above `iam_policy` examples take various parameter styles. Jets allows for different IAM Policy Definition styles for your convenience. The `iam_policy` takes a single parameter or list of parameters. Jets expands each parameter in the list to Policy Statements in an IAM Policy Document.

Summary of the different expansion styles:

1. Simple Statement: simplest
2. Statement Hash
3. Full Policy Hash: most complex

You should start off with the most straightforward `iam_policy` definition style and use the more complex styles as needed. Here are examples of each style with their expansion:

### IAM Policy Simple Statement

```ruby
iam_policy("s3", "sns")
```

Expands to:

```yaml
Version: '2012-10-17'
Statement:
  - Action:
    - s3:*
    - sns:*
  Effect: Allow
  Resource: "*"
```

The notation with `:*` also works: `iam_policy("s3:*", "sns:*")`.

### IAM Policy Statement Hash

```ruby
class_iam_policy(
  "dynamodb",
  {
    Action: ["kinesis:*"],
    Effect: "Allow",
    Resource: "arn:aws:kinesis:#{Jets.aws.region}:#{Jets.aws.account}:stream/ name*",
  }
)
```

Expands to:

```yaml
Version: '2012-10-17'
Statement:
  - Action:
    - dynamodb:*
    Effect: Allow
    Resource: "*"
  - Action:
    - kinesis:*
    Effect: Allow
    Resource: "arn:aws:kinesis:us-west-2:1234567890:stream/name*"
```

Note, the resource values are examples.

### IAM Policy Full Policy Hash

```ruby
iam_policy(
  Statement: [{
    Action: ["lambda:*"],
    Effect: "Allow",
    Resource: "*"
  }]
)
```

Expands to:

```yaml
Version: '2012-10-17'
Statement:
  - Action:
    - lambda:*
    Effect: Allow
    Resource: "*"
```

Note: Jets always produces a `Version: "2012-10-17"` in the final document. You should not include it since it's not used.

## IAM Policy Definition Expansion

What's important to understand is that ultimately, the `iam_policy` definition expands to include an IAM Policy document that looks something like this:

```yaml
PolicyDocument:
  Version: '2012-10-17'
  Statement:
  - Action:
  - s3:*
  Effect: Allow
  Resource: "*"
```

