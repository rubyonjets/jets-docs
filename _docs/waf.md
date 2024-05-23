---
title: Lambda URL CloudFront WAF
nav_text: WAF
category: top-level
subcategory: waf
order: 8
---

You can associate an existing WAF ACL with the CloudFront distribution.

{% include config/cloudfront/waf-example.md %}

{% include config/cloudfront/waf-command.md %}

## Configure Jets WAF

You can adjust the default rules or add additional custom-user rules. Example:

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  # change the default rules
  config.waf.default_rules = %w[
    AWSManagedRulesAmazonIpReputationList
    AWSManagedRulesCommonRuleSet
    AWSManagedRulesKnownBadInputsRuleSet
  ]
  # add additional custom-user rules
  config.waf.rules = []
  config.waf.monitoring = false # When true, adjust rules to use Count action to all rules
  # config.waf.name = Jets.env # IE: dev
end
```

**Note**: The `config.waf` can be in `config/waf.rb` or `config/deploy.rb`. It's recommended to use `waf.rb` to make it clear that it's for WAF settings. Similarly, you can also have  `config/waf/dev.rb` and `config/waf/prod.rb`.

## Jets WAF us-east-1

The Jets WAF is always deployed to **us-east-1** because that's a CloudFront requirement. CloudFront operates out of `us-east-1`, so the WAF must also reside there. Regardless of what you set your AWS_REGION to, Jets will switch and use `us-east-1` for the WAF standalone stack. The CloudFormation stack can be found in `us-east-1`.

{% include reference/config/header.md %}
{% include reference/config/deploy/waf.md %}
{% include reference/config/footer.md %}
