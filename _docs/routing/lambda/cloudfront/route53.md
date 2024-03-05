---
title: Lambda URL CloudFront Route53
nav_text: Route53
category: routing-lambda-cloudfront
order: 2
---

Jets can automatically create a Route53 record pointing to the managed CloudFront domain.

## Enabling

To enable the Route53 record creation:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")

  config.lambda.url.cloudfront.dns.enable = true # <= ENABLE
  # additional aliases
  config.lambda.url.cloudfront.aliases = [
    "www.domain.com"
  ]
  # config.lambda.url.cloudfront.conventional_alias = true # IE: demo-dev.domain.com
end
```

* A conventional alias is created by default with the Jets project name and env. IE: `project: demo` and `Jets.env: dev` => demo-dev.domain.com. You can control this behavior with `config.lambda.url.cloudfront.conventional_alias = false`
* The conventional alias domain is inferred by using acm.describe_certificate and using the ACM Cert domain value.

{% include lambda/cloudfront/deploy-extra.md %}

All route53 DNS aliases have the same TTL values and point to the same CloudFront Distribution domain name. Example:

    demo-dev.domain.com => https://d1cfl6s9mcuypm.cloudfront.net
    name1.domain.com    => https://d1cfl6s9mcuypm.cloudfront.net
    name2.domain.com    => https://d1cfl6s9mcuypm.cloudfront.net
    my.domain.com       => https://d1cfl6s9mcuypm.cloudfront.net
