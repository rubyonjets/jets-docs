---
title: Jets Config Helpers WAF
nav_text: WAF
category: config-helpers
order: 8
---

These helpers look up EC2 resources.

### web_acl_arn

Looks up the Web ACL Arn. The `cloudfront.web_acl_id` actually wants the ARN.

Example:

```ruby
config.lambda.url.cloudfront.web_acl_id = web_acl_arn("prod")
```
