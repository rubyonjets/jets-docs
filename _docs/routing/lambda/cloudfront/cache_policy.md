---
title: Lambda URL CloudFront Cache Policy
nav_text: Cache Policy
category: routing-lambda-cloudfront
order: 4
---

The Jets Managed CloudFront Distribution creates a default Cache Policy with reasonable defaults that works right out of the box. You can customize the Cache Policy if needed.

## Default Cache Policy




## Customize

To enable the Lambda URL CloudFront feature:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"
end
```
