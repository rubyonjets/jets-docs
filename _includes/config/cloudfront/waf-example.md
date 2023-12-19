Here's an example of how to configure an existing WAF.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "example.com"

  config.lambda.url.cloudfront.web_acl_id = web_acl_arn("prod")
end
```

Note that `web_acl_id` expects the arn, so the code above is correct. The setting is called `web_acl_id` because it matches with the CloudFormation property. Here's a useful cheatsheet command to list your WAFs that CloudFront can use.

    aws wafv2 list-web-acls --scope=CLOUDFRONT --region=us-east-1 | jq

Assigning an existing WAF ALC allows you to reuse and associate its Rules with multiple CloudFront Distributions. It can help keep your WAF rules DRY. IE: Change the rules once, and they protect all the CloudFront traffic across all apps.

WAF Web ACL must be a global WAF. Regional WAFs do not work with CloudFront. The `web_acl_arn` helper can take in an options hash at the end. It defaults `{scope: "CLOUDFRONT"}`.

Also note that CloudFront provides built-in baseline protection called [AWS Sheild Standard](https://aws.amazon.com/shield/faqs/). You get it just by using it.

> AWS Shield Standard provides protection for all AWS customers against common and most frequently occurring infrastructure (layer 3 and 4) attacks like SYN/UDP floods, reflection attacks, and others to support high availability of your applications on AWS.

A WAF provides additional protection measures.
