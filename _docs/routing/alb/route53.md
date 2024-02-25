---
title: Route53 DNS Support
nav_text: Route53
category: routing-alb
order: 4
---

Jets can automatically create a "friendly" Route53 DNS record and connect it to the Application Load Balancer DNS Name.

{% include pro/feature.md feature_name="Application Load Balancer" %}

## Configuring

Example:

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.enable = true
  config.alb.dns.enable = true
  config.alb.dns.domain = "domain.com" # recommended only to set this option and Jets infers the rest
end
```

When the `config.alb.dns.domain` is configured, Jets creates a conventional Route53 record and points it to the ELB DNS name.

    demo-web-dev.domain.com -> demo-de-Alb-7DSB8ODFY8QP-1678773019.us-west-2.elb.amazonaws.com

This is the recommended way to configure managed DNS.

Then, you can CNAME your domain to the conventional DNS record. Example:

    www.domain.com -> demo-web-dev.domain.com -> demo-de-Alb-7DSB8ODFY8QP-1678773019.us-west-2.elb.amazonaws.com

This allows you complete control of the user-facing DNS record.

**IMPORTANT**: The route53 host zone must already exist. You can create a route53 hosted zone with the AWS CLI like so:

    aws route53 create-hosted-zone --name mydomain.com --caller-reference $(date +%s)
    aws route53 list-hosted-zones

{% include config/reference/header.md %}
{% include config/reference/alb/dns.md %}
{% include config/reference/alb/footer.md %}
