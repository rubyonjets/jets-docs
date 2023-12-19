---
title: Lambda URL CloudFront WAF Jets Default Rules
nav_text: Default Rules
category: waf
order: 2
---

When you enable the WAF feature, Jets enables 3 WAF rules by default.

    ❯ jets waf:info
    Name       dev
    Id         4bc7a6a1-fac4-4d9c-be2f-7d55464dd085
    Capacity   227
    Rule 1     Jets-BlanketRateLimit
    Rule 2     AWS-AWSManagedRulesAmazonIpReputationList
    Rule 3     AWS-AWSManagedRulesKnownBadInputsRuleSet
    Metric     dev
    Logging    log-group:aws-waf-logs-dev

The rules provide a reasonable default starting point to protect your application.

1. **Jets-BlanketRateLimit**: This protects your entire application by limiting requests from any IP address. Example: Blocks IPs making over 1,000 requests in 5 minutes It's a fundamental rule for DDoS protection.
2. **AWS-AWSManagedRulesAmazonIpReputationList**: This blocks malicious traffic from IPs identified by Amazon's threat intelligence.
3. **AWS-AWSManagedRulesKnownBadInputsRuleSet**: This blocks traffic known to have request patterns that are invalid and linked to exploiting or discovering vulnerabilities.

Related: [The three most important AWS WAF rate-based rules](https://aws.amazon.com/blogs/security/three-most-important-aws-waf-rate-based-rules/)

## Jets vs CloudFront One-Click WAF Rules

CloudFront provides a "One-Click Protection" WAF in the CloudFront console: [Using AWS WAF protections](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-awswaf.html)

> Use one-click protection in the CloudFront console. One-click protection creates an AWS WAF web access control list (web ACL), configures rules to protect your servers from common web threats, and attaches the web ACL to the CloudFront distribution for you. The topics in this section assume the use of one-click protections.

Here are the "one-click protection" CloudFront WAF rules.

* [AWSManagedRulesAmazonIpReputationList](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-ip-rep.html)
* [AWSManagedRulesCommonRuleSet](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html)
* [AWSManagedRulesKnownBadInputsRuleSet](https://docs.aws.amazon.com/waf/latest/developerguide/aws-managed-rule-groups-baseline.html#aws-managed-rule-groups-baseline-known-bad-inputs)

The Jets WAF uses only 2 of the 3 rules. In practice, we have found that the AWSManagedRulesCommonRuleSet has too many false postives. Hence, Jets does not include it in it's default. You can also add it if you need to use it. It's strongly recommended that you first monitor with it first.

Related: [For people who have been using AWS Managed rules on AWS WAF, How have you dealt with xss false positive](https://www.reddit.com/r/aws/comments/wd6vkw/comment/iihnxnl/)
