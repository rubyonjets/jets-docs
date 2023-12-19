---
title: Lambda URL CloudFront DNS Route53
nav_text: Route53
category: routing-lambda-cloudfront
order: 2
---

Jets can automatically create a DNS Route53 record pointing to the managed CloudFront domain.

## Enabling

To enable the DNS Route53 record creation:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")
  # config.lambda.url.cloudfront.aliases = [
  #   "www.example.com"
  # ]

  config.lambda.url.cloudfront.route53.enable = true # <= ENABLE
end
```

* A conventional alias is created by default with the Jets project name and env. IE: `project: demo` and `Jets.env: dev` => demo-dev.domain.com.
* The conventional alias domain is inferred by from the ACM cert configured in `cloudfront.cert.arn`. It's domain name is used to look up the route53 hosted zone name.
* If you set `cloudfront.aliases` then the [conventional alias]({% link _docs/routing/lambda/cloudfront/distribution.md %}#conventional-aliases) is not set.

{% include lambda/cloudfront/conventional-aliases.md %}

All route53 DNS aliases have the same TTL values and point to the same CloudFront Distribution domain name. Example:

    demo-dev.domain.com => https://d1cfl6s9mcuypm.cloudfront.net
    name1.domain.com    => https://d1cfl6s9mcuypm.cloudfront.net
    name2.domain.com    => https://d1cfl6s9mcuypm.cloudfront.net
    my.domain.com       => https://d1cfl6s9mcuypm.cloudfront.net
