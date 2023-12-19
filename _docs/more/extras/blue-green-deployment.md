---
title: Blue-Green Deployment
category: extras
order: 12
---

## What is a Blue-Green Deployment?

A blue-green deployment is creating a new stack, testing it, and then switching to it with DNS. You delete the old stack at the end.

## What is a Normal Jets Deployment?

Underneath the hood, Jets uses CloudFormation to deploy Lambda functions and AWS resources. During the update, CloudFormation creates new resources, ensures they are created successfully, and then deletes any old ones. CloudFormation does this to avoid deleting the existing resources and putting us stuck in a terrible state. It is entirely logical. For the most part, a regular Jets deployment suffices.

## Blue-Green Deployment Steps

Sometimes blue-green deployments are required. For example, [upgrading]({% link _docs/more/extras/upgrading.md %}) between different versions of Jets can require a blue-green deployment.

This is where the power of Jets shines. Since Jets codifies both your code and AWS infrastructure resources, we can create another [extra environment]({% link _docs/env/extra.md %}) and switch to it. Here are the steps:

1. Create another environment by deploying with `JETS_EXTRA`.
2. Test it to your heart's content
3. Switch the API Gateway Custom Domain over to the new stack
4. Delete the old environment

## Additional CloudFront Distribution

Jets can create a [CloudFront Distribution]({% link _docs/routing/lambda/cloudfront/distribution.md %}) in front of your AWS Lambda Function URL. Creating an Alias that points your website to the CloudFront distribution is easy. Example:

    www.website.com -> Jets Managed CloudFront -> Lambda Function URL

You may want more control over the user-facing www.website.com DNS record, though. In this case, you can set up something like this:

    www.website.com -> Manual Managed CloudFront -> Jets Managed CloudFront -> Lambda Function URL

With manual control over the CloudFront distribution, you can point it to and switch to another Jets app if you want. This is known as blue-green deployments, a strategy that allows you to minimize downtime and reduce the risk of deployment-related issues.

The Jets Managed CloudFront distribution gives you a friendlier DNS name than the random Lambda Function URL. It also provides some additional features like WAF and proper mapping for the host header.

With the Manual User-Facing CloudFront distribution, you probably want to match the Cache Policies to match the Jets Managed one.

## CloudFormation Management of Route53 Record

If you have an existing route53 DNS record and configure Jets to use the same DNS entry, Jets and CloudFormation will not overwrite it. Instead, the deployment will fail and roll back.

You do not want to delete the DNS record because it will result in downtime. One trick to mitigate downtime is deleting the DNS record as the CloudFormation update is deploying. The DNS management is swapped from your manual management to being managed by Jets and CloudFormation.

Before taking these steps, you should update the DNS Record TTL down to 60s. Then, take these steps.

Deploy your app with `route53.enable = false` first. Set `route53.enable = true` and deploy again.
When CloudFormation reaches the step where it says `CREATE_IN_PROGRESS` for the DNS records, you'll see it takes some time. This is because It sees the existing DNS record and is "retrying."
At this point, you delete your DNS record. You'll see CloudFormation create the record almost immediately.

CloudFormation has taken over management of the DNS record.


