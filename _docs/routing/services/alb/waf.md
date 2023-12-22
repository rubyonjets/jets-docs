---
title: Web Application Firewall Support
nav_text: WAF
category: routing-services-alb
order: 6
---

You can associate an exisitng WAF ACL with the ALB. Here's an example:

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.waf.web_acl = waf_arn("demo-waf") # find web acl arn by name
end
```

This allows you to reuse one WAF ACL and associate its Rules with multiple ALBs. It can help keep your WAF Rules DRY. IE: Change the rules one time and they protect all the ALB traffic.
