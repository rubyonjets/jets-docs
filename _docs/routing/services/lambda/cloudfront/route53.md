---
title: Lambda URL CloudFront Route53
nav_text: Route53
category: routing-services-lambda-cloudfront
order: 1
---

Jets can automatically create a Route53 record pointing to the managed CloudFront domain.

{% include pro/feature.md feature_name="Lambda URL CloudFront" %}

## Enabling

To enable the Route53 record creation:

config/deploy.rb

```ruby
Jets.application.configure do
  config.lambda.url.cloudfront.enable = false
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"

  config.lambda.url.cloudfront.dns.enable = true # Jets can also automatically create the route53 record
  # config.lambda.url.cloudfront.dns.name = "my.domain.com" # optional, recommend the conventional name instead
end
```

The `config.lambda.url.cloudfront.dns.name` is optional. Instead, it's recommended you let Jets set a conventional DNS name based on the `config.lambda.url.cloudfront.domain`.

The `cloudfront.dns.name` will be named `APP-ENV.domain.com`.

For example:

    cloudfront.domain => "domain.com"
    cloudfront.dns.name => "demo-dev.domain.com"

This allows you to deploy additional stacks or environments easily. Examples:

    JETS_EXTRA=beta jets deploy
    cloudfront.dns.name => "demo-dev-beta.domain.com"
    JETS_EXTRA=2 jets deploy
    cloudfront.dns.name => "demo-dev-2.domain.com"
    JETS_ENV=production jets deploy
    cloudfront.dns.name => "demo-dev-prod.domain.com"

