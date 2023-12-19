---
title: Jets Config Helpers ACM
nav_text: ACM
category: config-helpers
order: 8
---

These helpers look up ACM certs. The `domain` option is required. Usually, you want to specify `region: "us-east-1"` also for CloudFront ACM certs.

```ruby
acm_cert_arn(domain: "example.com", region: "us-east-1")
acm_cert_arn(domain: "example.com", tag: "main example.com", region: "us-east-1")
acm_cert_arn(domain: "example.com", sans: ["example.com", "*.example.com"], region: "us-east-1")
```

If multiple ACM certs are found with the same domain, then an error is raised.

You can filter down and target the ACM cert you want with the additional options: `tag` and `sans`.

Scope Filtering notes:

* **domain** is always required
* **tag**: You must tag the ACM cert with a tag "Name" when the `tag` option is a String. IE: `tag: "main example.com"`. When the `tag` option is a Hash, you can specify the tag key. IE: `tag: {Name: "main example"}`.
* **sans** works up to 100 items.

## Future Proofing

You may want to always tag your ACM certs and look them up with the `tag` option to future proof the setup. Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.lambda.url.cloudfront.enable = true
 config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", tag: "main example.com", region: "us-east-1")

  # config.lambda.url.cloudfront.route53.enable = true
end
```

This is because if you have an ACM cert with a domain name of "example.com" and then later on add another ACM cert. The `deploy.rb` will break later because suddenly **two** ACM certs have the domain name of "example.com".

You may also consider just hardcoding the ACM ARN. However, that would not be as human-friendly to read. When you look at it months later it can be more confusing to understand.
