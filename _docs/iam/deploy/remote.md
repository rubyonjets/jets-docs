---
title: Remote Runner Deploy IAM Policy
nav_text: Remote
category: iam-deploy
order: 2
---

The IAM role used to run the `jets deploy` command needs minimal IAM policies to deploy and create the AWS resources for your project. Here is a table of the services in the default policy in general:

* API Gateway
* CloudFormation
* CloudFront
* CodeBuild
* DynamoDB
* EC2
* ECR
* ECR Public
* Events
* IAM
* Lambda
* Logs
* Route53
* S3
* SNS
* SQS
* STS
* WAF
* WAFv2

...
**Note**: Jets dynamically adds some of these permissions to the IAM Role only when needed, e.g., EC2 when using VpcConfig. The permissions try to find a balance between too strict permissions that may cause issues and user-friendliness and convenience. Also, the IAM permissions change in the future as Jets evolves and add features.

## Configuring Remote IAM Permissions

See: [Remote Runner CodeBuild IAM Permissions]({% link _docs/remote/codebuild/iam.md %}).
