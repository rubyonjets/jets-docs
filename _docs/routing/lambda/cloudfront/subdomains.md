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

**Important**: An error is raised if multiple ACM certs are found with the same domain.

You can filter down and target the ACM cert you want with the additional options: `tag` and `sans`. Here are some filtering notes:

* **domain**: The domain is always required.
* **tag**: You must tag the ACM cert with a tag "Name".
* **sans**: An array of Subject Alternative Names. Up to 100 items work.

## Future Proofing

You may always want to tag your ACM certifications and look them up with the `tag` option to future-proof the setup. Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.lambda.url.cloudfront.enable = true
 config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", tag: "main example.com", region: "us-east-1")

 # config.lambda.url.cloudfront.route53.enable = true
end
```

This is because if you have an ACM cert with a domain name of "example.com" and then later add another ACM cert, the `deploy.rb` will break later because "suddenly" **two** ACM certs have the domain name with "example.com."

You may also consider hardcoding the ACM ARN. However, that would not be as human-friendly to read, and when you look at it months later, it can be more confusing to understand.
