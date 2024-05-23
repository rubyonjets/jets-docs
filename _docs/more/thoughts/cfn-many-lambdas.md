---
title: CloudFormation Many Lambda Functions Thoughts
nav_text: Many Lambdas?
desc: Whether or not to collapse the number of Lambda functions down to one or have multiple Lambda functions.
category: thoughts
order: 1
---

Jets v5 introduced uses a single Lambda Function to handle all controller requests.

## Pros and Cons

There are pros and cons to using a single function vs multiple functions.

Pros for single function:

* **Quicker deploys**. Only one function needs to be updated. Have seen users deploy Jets apps with 500+ lambda functions. Here's a [PR: paginate api gateway resources to support more routes for large apps #357](https://github.com/rubyonjets/jets/pull/357) that tests the APIGW resources side of it. Though apps can get as large as you want, deploying so many resources will slow down deploy times. Apps with 500+ lambda functions and hundreds of APIGW resources can take 8 minutes to deploy. An app iwth a single function can take under 2m.
* **Prewarming**: Prewarming becomes less of a problem. Since all controller actions hit the **same** lambda function. The function is pretty much always warm. You may hit the AWS Account default Lambda concurrency limit of 2,000 quicker, but 2000 processes is pretty high. Think 2000 containers.
* **Logs**: You only have to look for logs in one single function. It's more centralized in this sense.

Cons for a single function:

* **Fine-grain control**: You don't have as much fine-grain control over individual lambda function properties like memory size and notable IAM permissions. A single function is configured so it shares the same configuration for function properties and the same IAM permission. Most non-serverless apps work this way anyway.
* **Thundering herd**: Though pre-warming is less of a problem. You might have a more notable thundering herd issue. IE: When there is a lambda cold start, all the requests will be hit by the same cold start penalty at the very same time. This is similar to most app deployments though.

## Conclusions

Believe that most apps, IE: More than 80% of apps, won't need the fine-grainer control over IAM policies and would rather take the benefit of faster deploy times. This is why it was choosen for Jets v5.

