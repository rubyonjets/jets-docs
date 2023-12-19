---
title: Lambda URL CloudFront WAF Jets Tips
nav_text: Tips
category: waf
order: 20
---

Here are some tips:

## Download WAF JSON

You can download WAF JSON to quickly view the rules from the console. This is the quickest way the definition and faster than using the AWS CLI.

## Deleting the WAF

When you run `jets waf:delete`, it deletes the CloudFormation stack that has the WAF.

However, if the WAF is associated with resources like CloudFront distributions, the CloudFormation stack will not delete cleanly and end up in a `DELETE_FAILED` state.

You have to first disasociate all the resources with the WAF. Then you can cleanly delete the CloudFormation stack and WAF with

    jets waf:delete
