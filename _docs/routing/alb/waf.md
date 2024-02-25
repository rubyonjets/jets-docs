---
title: Web Application Firewall Support
nav_text: WAF
category: routing-alb
order: 6
---

You can associate an existing WAF ACL with the ALB. Here's an example:

{% include pro/feature.md feature_name="Application Load Balancer" %}

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.waf.web_acl = web_acl_arn("demo-waf") # find web acl arn by name
end
```

{% include pro/helper.md helper_name="web_acl_arn" %}

This allows you to reuse one WAF ACL and associate its Rules with multiple ALBs. It can help keep your WAF Rules DRY. IE: Change the rules one time, and they protect all the ALB traffic.
