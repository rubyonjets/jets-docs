---
title: Lambda URL CloudFront Distribution
nav_text: Distribution
category: routing-lambda-cloudfront
order: 1
---

You can put CloudFront in front of the Lambda Function URL to provide a user-friendly URL endpoint.

## Enabling

To enable the Lambda URL CloudFront feature:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")

  # config.lambda.url.cloudfront.dns.enable = true
end
```

The ACM cert must already exist. The cert also much be in region `us-east-1` since CloudFront operates out of us-east-1.

The `acm_cert_arn` helper method looks up the ARN with the domain name. You can also just hard code the ARN. Example:

```ruby
Jets.deploy.configure do
  # ...
  config.lambda.url.cloudfront.cert = "arn:aws:acm:us-east-1:112233445566:certificate/14621e4a-00e9-422a-adec-935a8EXAMPLE"
end
```

## Aliases

You can add more aliases with the `aliases` option.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"
  config.lambda.url.cloudfront.aliases = ["name1.domain.com", "name2.domain.com"]
end
```

This adds CNAMEs in additional to the conventional dns names.

## Conventions

The `config.lambda.url.cloudfront.domain = "domain.com"` results in a conventional `demo-dev.domain.com` Cloudfront cname or alias.

{% include lambda/cloudfront/deploy-extra.md %}


Note: You can disable the convention with `config.lambda.url.cloudfront.enable_conventions = false`.

