---
title: Lambda URL CloudFront WAF Block IPs
nav_text: Block IPs
category: waf
order: 5
---

If you need block IP addresses.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.block_ips.enable = true
  config.waf.block_ips.list = [
    "1.1.1.1", # "1.1.1.1/32" implied
    "2.2.2.2/24",
    "2001:0db8:85a3:0000:0000:8a2e:0370:7334" # ".../128" # implied also
    "2001:db8::/32"
  ]
end
```

The IP blocking happens within CloudFront. The request never hits your Lambda function.
