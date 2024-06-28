---
title: Using Load Balancer Route53 Managed DNS
nav_text: Route53
category: load-balancer
order: 1
---

Jets can automatically create a DNS Route53 record pointing to the ELB Load Balancer.

## Enabling

To enable the DNS Route53 record creation:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.elb.route53.enable = true # <= ENABLE
  config.elb.route53.domain = "example.com"
  # config.elb.route53.name = "app.example.com" # explicit DNS name instead of conventional
end
```

* A conventional alias is created by default with the Jets project name and env. IE: `project: demo` and `Jets.env: dev` => demo-dev.example.com.

{% include lambda/cloudfront/conventional-aliases.md %}

All route53 DNS alias point to the same ELB DNS Name. Example:

    demo-dev.example.com => http://demo-d-LoadB-7yS4ZIxsASjr-314349207.us-west-2.elb.amazonaws.com
