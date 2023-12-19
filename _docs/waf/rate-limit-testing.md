---
title: Lambda URL CloudFront WAF Jets Blanket Rate Limiter Testing
nav_text: Rate Limit Testing
category: waf
order: 10
---

Here's an example of the Jets Blanket Rate Limiter in action. We've configured the limit to 100, the lowest permitted WAF setting for testing.

config/jets/waf.rb

```ruby
Jets.deploy.configure do
  config.waf.custom_rules.blanket_rate_limiter.enable = true # default is true
  config.waf.custom_rules.blanket_rate_limiter.limit = 100 # default 1000
end
```

## Test with ab and curl

You can use a simple tool like [ab](https://httpd.apache.org/docs/2.4/programs/ab.html) to get the rate limit.

    ab -n 100 -c 10 https://demo-dev.example.com/

After running it twice, you should have exceeded the WAF rate limit of 100.

Then, if you hit it again with curl, you'll get a 403 response.

    $ curl -sv "https://demo-dev.example.com/"
    # ...
    < HTTP/2 403
    < server: CloudFront
    < date: Sun, 19 May 2024 22:51:51 GMT
    < content-type: text/html
    < content-length: 919
    < x-cache: Error from cloudfront
    < via: 1.1 2e87eef03ab555daefa684d946e111b4.cloudfront.net (CloudFront)
    < x-amz-cf-pop: HIO52-P2
    < x-amz-cf-id: oLkHaOtOhO4fjqdHAgN-T0YHrtv-C7tAGPT_j05znkYW7Zu8L4kPSw==
    <
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <HTML><HEAD><META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=iso-8859-1">
    <TITLE>ERROR: The request could not be satisfied</TITLE>
    </HEAD><BODY>
    <H1>403 ERROR</H1>
    <H2>The request could not be satisfied.</H2>
    <HR noshade size="1px">
    Request blocked.
    We can't connect to the server for this app or website at this time. There might be too much traffic or a configuration error. Try again later, or contact the app or website owner.
    <BR clear="all">
    If you provide content to customers through CloudFront, you can find steps to troubleshoot and help prevent this error by reviewing the CloudFront documentation.
    <BR clear="all">
    <HR noshade size="1px">
    <PRE>
    Generated by cloudfront (CloudFront)
    Request ID: oLkHaOtOhO4fjqdHAgN-T0YHrtv-C7tAGPT_j05znkYW7Zu8L4kPSw==
    </PRE>
    <ADDRESS>
    </ADDRESS>
    </BODY></HTML>

After a few minutes, your IP's rate limit resets, and the request will again return 200 response codes.

    $ curl -sv "https://demo-dev.example.com/" 2>&1 | grep '< HTTP'
    < HTTP/2 200

## Check CloudWatch Logs

You can also use CloudWatch Insights to confirm that the WAF blocked the request using the  `Jets-BlanketRateLimit` rule. Here's a query to help.

{% include waf/cloudwatch-insights/block-query.md %}

You should find a log entry that looks like this:

```json
{
  "timestamp": 1716159111979,
  "formatVersion": 1,
  "webaclId": "arn:aws:wafv2:us-east-1:112233445566:global/webacl/dev/d8ebd2fe-ddcd-4830-a240-6ac3786a9407",
  "terminatingRuleId": "Jets-BlanketRateLimit",
  "terminatingRuleType": "RATE_BASED",
  "action": "BLOCK",
  "terminatingRuleMatchDetails": [],
  "httpSourceName": "CF",
  "httpSourceId": "E2PPB3A2M07L7U",
  "ruleGroupList": [],
  "rateBasedRuleList": [
    {
      "rateBasedRuleId": "arn:aws:wafv2:us-east-1:112233445566_MANAGED:global/ipset/d8ebd2fe-ddcd-4830-a240-6ac3786a9407_0439adc1-7fc6-4e79-ba7f-2baa80ef7e8e_IPV4/0439adc1-7fc6-4e79-ba7f-2baa80ef7e8e",
      "rateBasedRuleName": "Jets-BlanketRateLimit",
      "limitKey": "IP",
      "maxRateAllowed": 100,
      "evaluationWindowSec": 300,
      "limitValue": "52.34.100.192"
    }
  ],
  "nonTerminatingMatchingRules": [],
  "requestHeadersInserted": null,
  "responseCodeSent": null,
  "httpRequest": {
    "clientIp": "52.34.100.192",
    "country": "US",
    "headers": [
      {
        "name": "host",
        "value": "demo-dev.example.com"
      },
      {
        "name": "user-agent",
        "value": "curl/7.81.0"
      },
      {
        "name": "accept",
        "value": "*/*"
      }
    ],
    "uri": "/",
    "args": "",
    "httpVersion": "HTTP/2.0",
    "httpMethod": "GET",
    "requestId": "oLkHaOtOhO4fjqdHAgN-T0YHrtv-C7tAGPT_j05znkYW7Zu8L4kPSw=="
  },
  "ja3Fingerprint": "4ea056e63b7910cbf543f0c095064dfe"
}
```