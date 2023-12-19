---
title: SSM Design Thoughts
nav_text: Thoughts
category: env-ssm
order: 8
---

When Jets deploys, it creates Lambda Functions with the Environment Variables from the `config/jets/env` files. A key point is that Jets resolves the SSM values at **deploy** time. Here are some thoughts on this SSM design decision.

I've considered loading the env values at runtime/bootup time/Lambda cold-start a few times. Ultimately, setting them in the Lambda Function Environment variables is worth the tradeoff. Here are some of the tradeoffs.

## Pros

* It's much easier to debug the environmental variables when you can see what Lambda env variables are used with the AWS Lambda console.
* There's no need for IAM permissions at Lambda cold-start time to fetch the SSM value.
* You won't have to deal with SSM rate-limiting issues.

## Cons

* Lambda Env variables only support simple text to store the values. You can use dynamic `resolve:ssm` values in CloudFormation, but the values resolve to plain text values. The `resolve:ssm-secure` is not supported.
* It's harder to debug SSM errors like missing names or IAM permissions at cold start times because it happens very early.
* You have to deal with SSM rate-limiting issues. The jets can handle this with exponential backoff at the cost of some complexity.

