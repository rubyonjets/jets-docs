---
title: Lambda URL CloudFront WAF Jets Listing IPs
nav_text: Listing IPs
category: waf
order: 6
---

AWS tracks IP addresses and their request counts to enforce rate limiting. You should be able see this IP list.

Note: Even though, AWS docs say that you should be able to see the IPs, I have not yet been able to see them. It's possible that the IPs have be blocked for a while before they show up. In the [Rate Limit Testing Example]({% link _docs/waf/rate-limit-testing.md %}), that does not seem to be enough to have them appear.

## AWS CLI Cheatsheet

    WEB_ACL_NAME=dev
    WEB_ACL_ID=84676386-03fa-418d-84bc-d33db18db211
    aws wafv2 get-rate-based-statement-managed-keys --scope=CLOUDFRONT --region=us-east-1 --web-acl-name=$WEB_ACL_NAME --web-acl-id=$WEB_ACL_ID --rule-name=Jets-BlanketRateLimit

It'll return something like this

    ❯ aws wafv2 get-rate-based-statement-managed-keys --scope=CLOUDFRONT --region=us-east-1 --web-acl-name=$WEB_ACL_NAME --web-acl-id=$WEB_ACL_ID --rule-name=Jets-BlanketRateLimit
    {
        "ManagedKeysIPV4": {
            "IPAddressVersion": "IPV4",
            "Addresses": []
        },
        "ManagedKeysIPV6": {
            "IPAddressVersion": "IPV6",
            "Addresses": []
        }
    }

Here's also some commands to grab the Web ACL values.

    WEB_ACL_ID=$(aws wafv2 list-web-acls --scope=CLOUDFRONT --region=us-east-1 | jq -r '.WebACLs[0].Id')
    WEB_ACL_NAME=$(aws wafv2 list-web-acls --scope=CLOUDFRONT --region=us-east-1 | jq -r '.WebACLs[0].Name')
    aws wafv2 get-rate-based-statement-managed-keys --scope=CLOUDFRONT --region=us-east-1 --web-acl-name=$WEB_ACL_NAME --web-acl-id=$WEB_ACL_ID --rule-name=Jets-BlanketRateLimit

Adjust them for your needs, IE: Changing `[0]`.
