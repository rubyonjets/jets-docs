---
title: Remote Runner CodeBuild IAM Permissions
nav_text: IAM
category: remote-codebuild
order: 1
---

You can customize the iam policy associated with the Remote Runner CodeBuild project. Here's an example:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.iam.policy = ["s3", "ec2"]
  config.codebuild.iam.managed_policy = ["AmazonS3FullAccess"]
  # Be careful overriding defaults as it can remove required permissions
  # config.codebuild.iam.default_policy = [...]
  # config.codebuild.iam.default_managed_policy = [...]
end
```

The CodeBuild project's purpose provide a remote runner to run the jets remote deploy process in a secure and reliably manner. It does the heavy lifting and needs a decent amount of IAM permissions. The default permissions look something like this:

```yaml
Policies:
  - PolicyName: DefaultPolicy
    PolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Action:
            - apigateway:*
            - cloudformation:*
            - cloudfront:*
            - codebuild:*
            - dynamodb:*
            - ecr-public:*
            - ecr:*
            - events:*
            - iam:*
            - lambda:*
            - logs:*
            - route53:*
            - s3:*
            - sns:*
            - sqs:*
            - sts:GetServiceBearerToken
          Effect: Allow
          Resource: "*"
ManagedPolicyArns:
  - arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess
  - arn:aws:iam::aws:policy/AWSCertificateManagerReadOnly
```

The default permissions are managed by Jet and may change. If you need to, you can override the `default_policy` and `default_managed_policy`. However, be careful, as you may remove some required permissions for things to work.

## Forms

The policy config can be a simple Array of Strings. Example:

```ruby
config.codebuild.iam.policy = ["s3", "ec2"]
```

In such case, the policy generated looks something like this:

```yaml
Policies:
  - PolicyName: CustomPolicy
    PolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Action:
            - s3:*
            - ec2:*
          Effect: Allow
          Resource: "*"
```

If an item in the Array is a Hash, then it'll use it as-is. Example:

```ruby
config.codebuild.iam.policy = [
  {
    PolicyName: "MyPolicy",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{Action: ["s3:*"], Effect: "Allow", Resource: "*"}]
    }
  }
]
```

## Related

* [Remote Runner Deploy IAM Policy]({% link _docs/iam/deploy/remote.md %})