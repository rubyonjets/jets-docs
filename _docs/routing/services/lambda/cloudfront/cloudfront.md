---
title: Lambda URL CloudFront
nav_text: CloudFront
category: routing-services-lambda
order: 1
---

Jets can automatically create a Route53 record pointing to the managed CloudFront domain.

{% include pro/feature.md feature_name="Lambda URL CloudFront" %}

## Enabling

To enable the Lambda URL CloudFront feature:

config/deploy.rb

```ruby
Jets.application.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"
end
```

{% include pro/helper.md helper_name="acm_cert_arn" %}

Note `region: "us-east-1"` is required since CloudFront operates out of us-east-1. The ACM cert must be in us-east-1.

The `domain = "domain.com"` results in a conventional `demo-dev.domain.com` Cloudfrot cname or alias.

You can disable the convention with `config.lambda.url.cloudfront.enable_conventions = false`.

## Aliases

You can add more aliases with the `aliases` option.

config/deploy.rb

```ruby
Jets.application.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"
  config.lambda.url.cloudfront.aliases = ["name1.domain.com", "name2.domain.com"]
end

This adds CNAMEs in additional to the conventional dns name.
