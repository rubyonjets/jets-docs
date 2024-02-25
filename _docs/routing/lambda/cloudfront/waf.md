---
title: Lambda URL CloudFront WAF
nav_text: WAF
category: routing-lambda-cloudfront
order: 3
---

You can associate an existing WAF ACL with the CloudFront distribution. Here's an example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"

  config.lambda.url.cloudfront.web_acl_id = web_acl_arn("global-waf", scope: "CLOUDFRONT")
end
```

This allows you to reuse one WAF ACL and associate its Rules with multiple CloudFront Distributions. It can help keep your WAF Rules DRY. IE: Change the rules one time, and they protect all the CloudFront traffic.

Also notice `scope: "CLOUDFRONT"`, the WAF Web ACL must be a global WAF. Regional WAFs do not work with CloudFront.
