---
title: API Gateway
nav_text: API Gateway
category: routing-services
subcategory: routing-services-apigw
order: 2
---

API Gateway was the default routing service used by Jets 5 and below. In Jets 6 and above, the default routing service is [Lambda Function URL]({% link _docs/routing/services/lambda.md %}).

## Enabling

If you need to enable API Gateway as a Routing Service, you can.

config/deploy.rb

```ruby
Jets.application.configure do
  config.apigw.enable = true
end
```
