---
title: SSL or HTTPS Support
nav_text: SSL
category: routing-services-alb
order: 4
---

Jets supports creating a Load Balancer with HTTPS/SSL termination with ACM certs.

{% include pro/feature.md feature_name="Application Load Balancer" %}

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.ssl.enable = true
  config.alb.ssl.certs = acm_cert_arn("example.com") # IE: "arn:aws:acm:us-east-1:111111111111:certificate/11111111-2222-3333-4444-555555555555"
  config.alb.dns.enable = true
  config.alb.dns.domain = "example.com" # for auto-created Route53 record also
end
```

{% include pro/helper.md helper_name="acm_cert_arn" %}

The `alb.ssl.certs` option can be assigned a single item or an Array with multiple certs. For the certificate arn, you will need to create a certificate with AWS ACM. To do so, you can follow these instructions: [Request a Public Certificate
](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html)

The example above uses the `acm_cert_arn` helper method to look up the ACM certificate with the domain. If you have multiple certs with the same domain, first cert in the API response is used.  If you need more specificity, then you can directly assign the full ACM Certificate ARN.

Additionally, the `acm_cert_arn` can take a list of domains. IE: `acm_cert_arn("example1.com", "example2.com")`, in which case an Array is returned.

{% include config/reference/header.md %}
{% include config/reference/alb/ssl.md %}
{% include config/reference/alb/footer.md %}
