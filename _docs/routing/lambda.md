---
title: Lambda Function URL
nav_text: Lambda URL
category: routing
subcategory: routing-lambda
order: 1
---

## The Default

The Lambda Function URL is the default Routing Service used by Jets. This is because:

* It's free.
* It's fast.
* It's simple.

## Configuring

If you need to turn off the Lambda Function URL, you can:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.enable = false # true is the default
end
```


