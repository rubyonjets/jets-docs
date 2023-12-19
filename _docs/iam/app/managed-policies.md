---
title: IAM Managed Policies
nav_text: Managed Policies
category: iam-app
subcategory: managed-policies
order: 2
---

Managed IAM policies are prebaked IAM policies managed by AWS. This is nice because when AWS releases new features with new API methods, AWS will update the IAM policy accordingly and we don't have to update the policy ourselves.  Managed polices are simple to use with Jets.

## Managed IAM Policies Example

Here's an example.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.lambda.iam.managed_policy = ["AmazonS3FullAccess", "AmazonSNSFullAccess"]
end
```

The Managed IAM Policies shorthand above ultimately get expanded and included into the CloudFormation templates and associated with the Lambda Functions.  It ulimately, looks something like this:

```yaml
IamRole:
  Type: AWS::IAM::Role
  Properties:
    ManagedPolicyArns:
    - arn:aws:iam::aws:policy/AmazonS3FullAccess
    - arn:aws:iam::aws:policy/AmazonSNSFullAccess
```

More details on what a raw IAM Policies can be found at:

* [AWS Managed Policies for Job Functions](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_job-functions.html)
* [AWS IAM Policies and Permissions docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policies-json)
* [CloudFormation IAM Policy reference docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html)

{% include iam/app-vs-deploy-note.md %}
