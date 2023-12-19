---
title: Function Properties
category: events-properties
---

Jets ultimately translate Ruby code into Lambda functions. Each [Lambda function's properties](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html) can be controlled with Jets. Here are the ways to set the function properties and their order of precedence:

1. function specific properties - highest precedence
2. class-wide function properties
3. global function properties set - lowest precedence

## Function Specific Properties

Specific function properties are set right above the method definition like so:

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  timeout 18 # function specific property for the index lambda function
  def dig
    puts "dig"
  end
end
```

## Class-wide Function Properties

Class-wide function properties set in the same class file and with a prefix of `class_`.

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  class_timeout 22
  timeout 18 # function specific property for the index lambda function
  def dig
    puts "dig"
  end

  def lift
    puts "lift"
  end
end
```

For the code above, the `new` method will have a function timeout of 22 seconds and the `index` method will have a function timeout of 18 seconds.

## Global Function Properties

To set function properties globally, edit the function key under the config object in:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  ...
  config.lambda.function.timeout = 30
  # config.lambda.function.memory_size = 3008
  config.lambda.function.environment = {
    key1: "value1",
    key2: "value2",
  }
end
```

{% include functions/controllers-vs-events.md type="properties" %}

## Function Properties Method

In the above example, we use the `timeout` and `class_timeout` method to set function properties. These convenience methods delegate to the more general `properties` and `class_properties` methods respectively.  The general methods also allow you to change any property for the lambda function. So you could have done this also:

```ruby
class CoolEvent < ApplicationEvent
  class_properties(timeout: 22)
  properties(timeout: 18) # function specific property for the index lambda function
  def dig
    puts "dig"
  end
end
```

Generally all the properties associated with Lambda functions have equivalent convenience methods.  Here's a list:

Function Specific | Class Wide
--- | ---
dead_letter_config | class_dead_letter_config
description | class_description
environment | class_environment
function_name | class_function_name
handler | class_handler
kms_key_arn | class_kms_key_arn
memory_size | class_memory_size
reserved_concurrent_executions | class_reserved_concurrent_executions
role | class_role
runtime | class_runtime
timeout | class_timeout
tracing_config | class_tracing_config
vpc_config | class_vpc_config
tags | class_tags


Refer to the [AWS::Lambda::Function](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html) CloudFormation docs for a list of the properties. You can also refer to the source code itself: [lambda/dsl.rb](https://github.com/rubyonjets/jets/blob/master/lib/jets/lambda/dsl.rb)

