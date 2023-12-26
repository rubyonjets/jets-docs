---
title: Lambda URL CloudFront Route53
nav_text: Route53
category: routing-services-lambda-cloudfront
order: 2
---

Jets can automatically create a Route53 record pointing to the managed CloudFront domain.

{% include pro/feature.md feature_name="Lambda URL CloudFront" %}

## Enabling

To enable the Route53 record creation:

config/deploy.rb

```ruby
Jets.application.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"

  config.lambda.url.cloudfront.dns.enable = true # <= ENABLE
  # config.lambda.url.cloudfront.dns.name = "my.domain.com" # optional, recommend conventional name instead
end
```

The `config.lambda.url.cloudfront.dns.name` is optional. Instead, it's recommended you let Jets set a conventional DNS name. Jets can does this using the the `config.lambda.url.cloudfront.domain` value.  The convention is `APP-ENV.domain.com`. For example:

    config.lambda.url.cloudfront.domain => "domain.com" => "demo-dev.domain.com"

This allows you to deploy additional stacks or environments wihthout any configuration changes. Examples:

    JETS_EXTRA=beta jets deploy
    cloudfront.dns.name => "demo-dev-beta.domain.com"
    JETS_EXTRA=2 jets deploy
    cloudfront.dns.name => "demo-dev-2.domain.com"
    JETS_ENV=production jets deploy
    cloudfront.dns.name => "demo-dev-prod.domain.com"

## Aliases

Jets can also automatically sets up route53 records for all aliases.

config/deploy.rb

```ruby
Jets.application.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"

  config.lambda.url.cloudfront.domain.aliases = ["name1.domain.com", "name2.domain.com"]

  config.lambda.url.cloudfront.dns.enable = true # <= ENABLE
  config.lambda.url.cloudfront.dns.name = "my.domain.com" # optional, recommend the conventional name instead
end
```

For the above, there will be Route53 records created for:

    demo-dev.domain.com # from config.lambda.url.cloudfront.domain
    name1.domain.com    # from config.lambda.url.cloudfront.domain.aliases
    name2.domain.com    # from config.lambda.url.cloudfront.domain.aliases
    my.domain.com       # from config.lambda.url.cloudfront.dns.name

They will all point to the CloudFront Distribution domain name. Example:

    demo-dev.domain.com => https://d1cfl6s9mcuypm.cloudfront.net
    name1.domain.com    => https://d1cfl6s9mcuypm.cloudfront.net
    name2.domain.com    => https://d1cfl6s9mcuypm.cloudfront.net
    my.domain.com       => https://d1cfl6s9mcuypm.cloudfront.net
