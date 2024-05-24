---
title: "Lambda URL CloudFront WAF Jets Custom Rules: Blanket and URI Rate Limiter"
nav_text: Jets Rules
category: waf
order: 4
---

Jets provides Custom Rules with reasonable defaults.

## Config

Here's an example config.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.custom_rules.blanket_rate_limiter.enable = true # default is true
  # config.waf.custom_rules.blanket_rate_limiter.limit = 1000
  # config.waf.custom_rules.blanket_rate_limiter.evaluation_window_sec = 300
  # config.waf.custom_rules.blanket_rate_limiter.aggregate_key_type = "IP"

  # config.waf.custom_rules.uri_rate_limiter.enable = true # default: false
  # config.waf.custom_rules.uri_rate_limiter.paths = ["/login", "/signup"] # default: ["/"]
  # config.waf.custom_rules.uri_rate_limiter.limit = 100
  # config.waf.custom_rules.uri_rate_limiter.logical_statement = "Or"
  # config.waf.custom_rules.uri_rate_limiter.evaluation_window_sec = 300
  # config.waf.custom_rules.uri_rate_limiter.aggregate_key_type = "IP"
  # config.waf.custom_rules.uri_rate_limiter.string_match_condition = "STARTS_WITH"
end
```

The custom rules and settings are overridable.

**Note**: Jets Custom Rules are different from AWS Managed rules. A Jets Custom Rule is a rule that Jets builds and maintains.

## Blanket Rate Limiter

The Blanker Rate Limiter rule protects your entire application by limiting requests from any IP address. Example: It blocks IPs making over 1,000 requests in 5 minutes. It's a fundamental rule for DDoS protection.

## URI Rate Limiter

The URI Rate Limiter rule can be used to apply stricter limits to specific urls. Example: Limits login page requests to 100 per 5 minutes to prevent brute force attacks. Slow-performing and expensive URIs can have even lower thresholds to maintain performance.

## Protection Before Lambda

It's important to note that the WAF protection is logical at the CloudFront CDN Layer. This means the request is blocked before it ever gets a chance to hit your Lambda function.

## Window vs Frequency

The evaluation window vs frequency at which AWS WAF checks the rate limit differs.

* [AWS Docs Rate-based rule high-level settings](https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based-high-level-settings.html)

> This setting doesn't determine how often AWS WAF checks the rate, but how far back it looks each time it checks. AWS WAF checks the rate frequently, with timing that's independent of the evaluation window setting.

It's easy to mistakenly think that setting it to a lower value, like 60 instead of 300, will result in the WAF service checking more frequently. The window has zero bearing over the frequency at which the WAF service checks. If you set it to 60, an attacker has to only wait for the 60s vs. 300s before their "rate limit quota" resets, and they can try again. So, it has the opposite effect of what you may think.

