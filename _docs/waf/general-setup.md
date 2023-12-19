---
title: Lambda URL CloudFront WAF General Setup Steps
nav_text: General Steps
category: waf
order: 1
---

The general WAF setup steps are:

1. Turn on logging and monitor first
2. Review logs
3. Activate blocking
4. Review logs for blocks
5. Disable logging

## Turn on Monitoring

It's wise to first turn on logging and monitoring mode before activating WAF rules fully.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.logging = true    # default: false
  config.waf.monitoring = true # default: false
end
```

The `config.waf.monitoring = true` will set the `OverrideAction: Count` for **all** rules.

This allows you to see what will be blocked without affecting live users first.

## Review Logs

You can use CloudWatch Logs Insights Querying to see what would be blocked. Here's an example query.

```sql
fields @timestamp, @message, action
| filter action = "ALLOW"
| parse @message /"terminatingRule":"(?<terminatingRule>[^"]*)"/
| filter terminatingRule != ""
| sort @timestamp desc
| limit 20
```

Related: [WAF Logging]({% link _docs/waf/logging.md %})

## Activate Blocking

Once the initial review looks good, you can disable monitoring mode and the rules will block.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.logging = true
  config.waf.monitoring = false
end
```

## Review Logs for Blocks

Afterward, you want to review the logs again for live blocks this time. Here's an example query.

{% include waf/cloudwatch-insights/block-query.md %}

## Disable Logging

If WAF rules are good, you might want to disable the WAF logging do reduce the extra costs from logging. This step really is option and depends more on your preference.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.logging = false
  config.waf.monitoring = false
end
```
