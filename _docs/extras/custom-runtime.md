---
title: "AWS Lambda Custom Runtime: Ruby 3.2 Support"
nav_text: Custom Runtime
category: extras
order: 19
---

To test Ruby 3.2 before of the official AWS Lambda release of Ruby 3.2 support, a [Custom Lambda Runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) can be used. This doc also serves as an example of how to configure your own Custom Runtime with Jets.

## Configure

config/application.rb

```ruby
Jets.application.configure do
  # ...
  config.function.runtime = "provided.al2"
  config.lambda.layers = [
    "arn:aws:lambda:us-west-2:536766270177:layer:ruby_3-2:1",
  ]
end
```

**Notes:**

* Important: Only use the Custom Runtime Layer for testing. It may be removed at any time in the future.
* AWS seems close according to this [GitHub Issues Thread: Ruby 3.x support #636](https://github.com/boltops-tools/jets/issues/636).
* Once AWS releases the Ruby 3.2 runtime officially, you should use that instead.
* This note may already be outdated, and AWS has already released 3.2 support.

## Custom Runtime for Different Regions

The Custom Runtime Lambda Layer needs to be in your same region. Choose from one in the list:

    arn:aws:lambda:ap-south-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:eu-north-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:eu-west-3:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:eu-west-2:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:eu-west-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:ap-northeast-3:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:ap-northeast-2:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:ap-northeast-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:ca-central-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:sa-east-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:ap-southeast-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:ap-southeast-2:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:eu-central-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:us-east-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:us-east-2:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:us-west-1:536766270177:layer:ruby_3-2:1
    arn:aws:lambda:us-west-2:536766270177:layer:ruby_3-2:1

## Deploy

To deploy, you should switch to Ruby 3.2 before deploying. Jets packages up gems based on the current ruby version in your environment. Here's an example of deployment.

    rbenv local 3.2.2
    jets deploy

## What Happens When AWS Releases Ruby 3.2

When AWS releases the official Ruby 3.2 runtime, Jets v4 should support it as-is. You just have to remove the Custom Runtime layer `config.lambda.layers` configuration in [config/application.rb](https://rubyonjets.com/docs/extras/custom-runtime/) and `jets deploy` again. That'll swap out the Custom Runtime with the Official Runtime. That's how it's supposed to work 😄
