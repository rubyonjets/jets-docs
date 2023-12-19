---
title: Lambda URL CloudFront Cache Policy
nav_text: Cache Policy
category: routing-lambda-cloudfront
order: 4
---

The Jets Managed CloudFront Distribution creates a default Cache Policy with simple defaults that works right out of the box. You can customize the Cache Policy if needed.

## Default Cache Policy

By default, all methods are allowed.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.default_cache_behavior.allow_methods = %w[HEAD DELETE POST GET OPTIONS PUT PATCH]
  # config.lambda.url.cloudfront.default_cache_behavior.properties = {}
end
```

If you need to adjust [DefaultCacheBehavior](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-defaultcachebehavior.html) you can use `default_cache_behavior.properties`. For the most part, the settings should probably be left to their defaults. If you need to set things like TTL, it's recommended you set it in the application with response headers.

{% include cloudfront/helpers.md header=true config_path="lambda.url" %}

## Forwarded Values

If you need more control over the caching behavior you can use `ForwardedValues`.

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.default_cache_behavior.forwarded_values = {
    QueryString: true,
    Cookies: {
      Forward: "none"
    },
    Headers: %w[
      Authorization
      Accept
      Referer
    ]
  }
end
```

The `ForwardedValues` setting take higher precedence than `CachePolicyId` setting.

A Jets technical note, when you set `ForwardedValues`, Jets will remove `CachePolicyId` and `OriginRequestPolicyId` from the CloudFormation template. Otherwise, CloudFormation uses the `CachePolicyId` when both are set.

**Note**: AWS considers Forwarded Values legacy. You can achieve the same result by creating Custom Managed Policies. The benefit of Custom Managed Policies is that they can be reused. This is particularly useful if you have a manually created CloudFront in front of the Jets Managed one. You can configure both CloudFront Cache Behaviors to use the same policy.
