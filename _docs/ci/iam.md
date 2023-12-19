---
title: Jets CI IAM Permissions
nav_text: IAM
category: ci
order: 5
---

You can customize the iam policy associated with the Remote Runner CodeBuild project. Here's an example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ci.iam.policy = ["s3", "ec2"]
  config.ci.iam.managed_policy = ["AmazonS3FullAccess"]
  # override defaults. be careful. can remove required permissions
  # config.ci.iam.default_policy = [...]
  # config.ci.iam.default_managed_policy = [...]
end
```

The CI project's purpose is to handle continuous integration. It automatically kicks off a `jets deploy` upon a `git push` or a scheduled event. Hence, it does not need a lot of permissions. It just needs enough to run a cfn bootstrap and kick off the deployment. The default permissions are:

```yaml
Policies:
  - PolicyName: DefaultPolicy
    PolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Action:
            - cloudformation:*
            - codebuild:*
            - iam:*
            - logs:*
            - s3:*
          Effect: Allow
          Resource: "*"
ManagedPolicyArns:
  - arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess
  - arn:aws:iam::aws:policy/AWSLambda_ReadOnlyAccess
```

The default permissions are managed by Jet and may change. If you need to, you can override the `default_policy` and `default_managed_policy`. However, be careful, as you may remove some required permissions for things to work.

## Forms

The policy config can be a simple Array of Strings. Example:

```ruby
config.ci.iam.policy = ["s3", "ec2"]
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
config.ci.iam.policy = [
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

