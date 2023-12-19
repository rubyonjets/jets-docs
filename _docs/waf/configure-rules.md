---
title: Lambda URL CloudFront WAF Configuring Rules
nav_text: Configure Rules
category: waf
order: 3
---

## Configure Rules

You can use any of the AWS and Vendor Rules, that you have marketplace access to, by configuring the rule names as an Array of String. Example:

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.rules = %w[
    AWSManagedRulesAdminProtectionRuleSet
    AWSManagedRulesAnonymousIpList
    AWSManagedRulesBotControlRuleSet
    AWSManagedRulesCommonRuleSet
  ]
end
```

Here are some useful commands to see available managed rules.

    aws wafv2 list-available-managed-rule-groups --scope=CLOUDFRONT --region us-east-1
    aws wafv2 list-available-managed-rule-groups --scope=CLOUDFRONT --region us-east-1 | jq -r '.ManagedRuleGroups[].Name' | sort

Here's a also [snapshot of the rules](https://gist.githubusercontent.com/tongueroo/e8d5f6125f7b48b1fbdb26696f217feb/raw/ecc69277f36aabd49256861341ea6340faf5d1c2/aws-managed-rule-groups.json)

## Rules Count vs Block

If you want to selectively set rules to count and block mode, you can use a Hash.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.rules = {
    AWSManagedRulesAdminProtectionRuleSet: "Count",
    AWSManagedRulesAnonymousIpList: "Count",
    AWSManagedRulesBotControlRuleSet: "Block",
    AWSManagedRulesCommonRuleSet: "Block"
  }
end
```

## Disabling Default Rules

If you would like to disable all the default Jets WAF rules.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.default_rules = []
  config.waf.custom_rules.blanket_rate_limiter.enable = false
end
```
