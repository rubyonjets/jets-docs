---
title: Lambda URL CloudFront WAF Jets Logging
nav_text: Logging
category: waf
order: 8
---

It can be useful to turn on logging to see whether or not the WAF is blocking or allowing requests through.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.logging.enable = true
end
```

By default, the WAF logging is not turned on since there is cost to log the requests.

**Note**: The CloudWatch logs are in the us-east-1 region because that's where the WAF and logging must be deployed for CloudFront.

## CloudWatch Logs Insights Querying

It's useful to use CloudWatch Logs Insights querying to filter down and find requests that the WAF is blocking. Here are some examples:

**blocked actions**

{% include waf/cloudwatch-insights/block-query.md %}

**filter by IP**

```sql
fields @timestamp, @message, action, httpRequest.clientIp, httpRequest.uri, httpRequest.httpMethod, webaclId
| filter httpRequest.clientIp = "52.34.100.192"
| sort @timestamp desc
| limit 20
```

**would-be blocked**

This one is a little trickier but very useful. If your WAF rule is in `count` or "monitoring" mode, it's useful to query and see what **would-be** blocked.


```sql
fields @timestamp, @message, action
| filter action = "ALLOW"
| parse @message /"terminatingRule":"(?<terminatingRule>[^"]*)"/
| filter terminatingRule != ""
| sort @timestamp desc
| limit 20
```
