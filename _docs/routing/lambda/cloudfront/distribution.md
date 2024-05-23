---
title: Lambda URL CloudFront Distribution
nav_text: Distribution
category: routing-lambda-cloudfront
order: 1
---

{% include routing/cloudfront-endpoint.md %}

## Enabling

To enable the Lambda URL CloudFront feature:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.lambda.url.cloudfront.enable = true
 config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")

 config.lambda.url.cloudfront.route53.enable = true
end
```

The ACM cert must already exist. It must also be in region `us-east-1` since CloudFront operates out of that region.

The `acm_cert_arn` helper method looks up the ARN with the domain name. You can also hard-code the ARN. Example:

```ruby
Jets.deploy.configure do
 # ...
 config.lambda.url.cloudfront.cert.arn = "arn:aws:acm:us-east-1:112233445566:certificate/14621e4a-00e9-422a-adec-935a8EXAMPLE"
end
```

The `acm_cert_arn` helper method make the config more human-readable and friendly.

## Aliases

You can set aliases with a config.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.lambda.url.cloudfront.enable = true
 config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")
 config.lambda.url.cloudfront.domain = "example.com"
 config.lambda.url.cloudfront.aliases = [
    "name1.example.com",
    "name2.example.com"
  ]
end
```

This overrides the conventional aliases.

## Conventional Aliases

Jets will create some conventional aliases when not set explicitly. The `config.lambda.url.cloudfront.domain = "example.com"` results in a conventional `demo-dev.example.com` Cloudfront alias.

{% include lambda/cloudfront/conventional-aliases.md %}

{% include cloudfront/related.md %}

{% include reference/config/header.md %}
{% include reference/config/deploy/lambda/cloudfront.md config_path="lambda.url" %}
{% include reference/config/footer.md %}
