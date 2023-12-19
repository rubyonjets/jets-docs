---
title: Managed IAM Policies Jets Events
nav_text: Events
category: managed-policies
order: 5
---

{% include iam/precedence.md %}

## Function specific Managed IAM policy

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  managed_iam_policy "AmazonEC2ReadOnlyAccess"
  rate "10 hours"
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

## Class-wide Managed IAM policy

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  class_managed_iam_policy(
    "IAMReadOnlyAccess",
    "service-role/AWSConfigRulesExecutionRole"
  )
  rate "10 hours"
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

## Application-Wide Managed IAM policy

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.lambda.iam.managed_policy = %w[
    AWSCloudTrailReadOnlyAccess
    IAMReadOnlyAccess
  ]
end
```

## Managed IAM Policies Inheritance

Managed IAM policies defined at lower levels of precedence inherit and include the policies from the higher levels of precedence. This is done so you do not have to duplicate your IAM policies when you only need to add a simple additional permission. For example, if you've configured the application-wide Managed IAM policy to look something like this:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.lambda.iam.managed_policy = %w[IAMReadOnlyAccess]
end
```

When you add a function specific IAM policy to a method:

```ruby
class CoolEvent < ApplicationEvent
  managed_iam_policy "AmazonEC2ReadOnlyAccess"
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

The resulting policy for the method will look something like this:

```yaml
ManagedPolicyArns:
- arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess
- arn:aws:iam::aws:policy/IAMReadOnlyAccess
```

So the Managed IAM policies are **additive**.

## IAM DSL Multiple Calls

When you call `class_iam_policy` multiple times, it appends permissions for that specific function. Example:

```ruby
class_iam_policy("AmazonS3ReadOnlyAccesss3")
class_iam_policy("CloudFrontReadOnlyAccess")
```

The same as:

```ruby
class_iam_policy("AmazonS3ReadOnlyAccess", "CloudFrontReadOnlyAccess")
```

