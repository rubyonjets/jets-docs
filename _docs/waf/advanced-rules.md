---
title: Lambda URL CloudFront WAF Advanced Custom Rules
nav_text: Advanced Custom
category: waf
order: 21
---

Jets can generate rules with different more advanced syntaxes.

## Shorthand Syntaxes

The shorthand syntax allows you to set the `Action` and `VendorName` when you need to override the convention.

## String Shorthand Form

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.rules = %w[
    AWSManagedRulesAdminProtectionRuleSet
    AWSManagedRulesAnonymousIpList:Count
    AWSManagedRulesBotControlRuleSet:Block
    AWS:AWSManagedRulesCommonRuleSet:Block
  ]
end
```

The `:` (colons) separate different possible attributes. The form is one of.

    RULE_NAME
    RULE_NAME:RULE_ACTION
    VENDOR_NAME:RULE_NAME:RULE_ACTION

So the simpliest form is just the Rule name, which will have a default action of `Block`. The most complex form can also include the vendor name at the beginning.

## Hash Shorthand Form

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.rules = {
    AWSManagedRulesAdminProtectionRuleSet: {Action: "Count"},
    AWSManagedRulesAnonymousIpList: {Action: "Count"},
    AWSManagedRulesBotControlRuleSet: {Action: "Block"},
    AWSManagedRulesCommonRuleSet: {Action: "Block", VendorName: "AWS"}
  }
end
```

The Hash form also accepts a VendorName if you need to override it.

## Fully Customized Hash Rules

If you need fully customized WAF Rules, you can use an Array of Hashes. When the item is a Hash it can be the full WAF Rule.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  # Custom Rules
  config.waf.rules = [
    {
      Name: "JetsManagedBlanketRateLimit",
      Action: {
        Block: {}
      },
      Statement: {
        RateBasedStatement: {
          Limit: 100,
          EvaluationWindowSec: 60,
          AggregateKeyType: "IP"
        }
      },
      VisibilityConfig: {
        CloudWatchMetricsEnabled: true,
        MetricName: "JetsManagedBlanketRateLimit",
        SampledRequestsEnabled: true
      }
    },
    {
      Name: "UriRateLimit",
      Statement: {
        RateBasedStatement: {
          Limit: 200,
          EvaluationWindowSec: 120,
          AggregateKeyType: "IP",
          ScopeDownStatement: {
            ByteMatchStatement: {
              SearchString: "/login",
              FieldToMatch: {
                UriPath: {}
              },
              TextTransformations: [
                {
                  Priority: 0,
                  Type: "NONE"
                }
              ],
              PositionalConstraint: "STARTS_WITH"
            }
          }
        }
      },
      Action: {
        Block: {}
      },
      VisibilityConfig: {
        SampledRequestsEnabled: true,
        CloudWatchMetricsEnabled: true,
        MetricName: "UriRateLimit"
      }
    }
  ]
end
```
