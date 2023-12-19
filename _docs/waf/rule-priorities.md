---
title: Lambda URL CloudFront WAF Jets Rule Priorities
nav_text: Rule Priorities
category: waf
order: 7
---

In general, with Jets, you should not have to set the **priority** of your rules explicitly. The order in which they are defined will determine the priority automatically. Jets loops through your rules and will assign the priority correctly.

## General Rule Priority

The general priorities of the rules work like this:

1. **config.waf.rules**: Your user-custom rules. These take the highest priorities.
2. **config.block_ips.list**: The rules that are created from the block ips list.
3. **config.managed_rules**: The [blank_rate_limiter]({% link _docs/waf/custom-rules.md %}#blanket-rate-limiter) and [uri_rate_limiter]({% link _docs/waf/custom-rules.md %}#uri-rate-limiter) Jets Managed rules.
4. **config.waf.default_rules**: Default rules.

If you do assign the priority, it will only be used within your custom rules definition, `config.waf.rules`. All the other rules will be higher than the max priority in your user-custom rules.
