---
title: IAM Policies
nav_text: Policies
category: iam-app
subcategory: iam-policies
order: 1
---

You can configure the `config/jets/deploy.rb` settings to customize your app IAM permissions. When Jets deploys your app to AWS, it uses these settings to create an IAM Role for your Lambda Function. Jets defines some default baseline IAM permissions and adds the permissions you grant.

## App IAM Policy: Additive

When you configure the IAM policy in `config/jets/deploy.rb`, Jets adds it to the Jets Managed "Application IAM Policy". Example.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.lambda.iam.policy = ["logs"]
end
```

Here's another example with a more granular Hash configuration.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.lambda.iam.policy = [
    {
      Action: ["dynamodb:*"],
      Effect: "Allow",
      Resource: "arn:aws:dynamodb:#{Jets.aws.region}:#{Jets.aws.account}:table/#{Jets.project.namespace}*",
    }
  ]
end
```

The config **adds** to the default Jets Application IAM policy. This is useful because the application policy is dynamically calculated depending on what resources need to be provisioned. For example:

* Using VPC with `config.lambda.function.vpc_config` will add the necessary VPC permissions to attach network resources to the Lambda Functions.
* Using [Jets Jobs]({% link _docs/jobs.md %}) will add the required SQS IAM permissions.
* Using [Shared Resources]({% link _docs/custom/shared-resources.md %}) will add CloudFormation read permissions.

## App IAM Policy: Override

If you wish to override the default Application IAM policy **entirely**, then set `config.lambda.iam.default_policy`.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.lambda.iam.default_policy = [
    {
      Action: ["logs:*", "s3:*"],
      Effect: "Allow",
      Resource: "*",
    }
  ]
end
```

**Be careful** doing this because it will override the IAM default policy entirely. This could prevent your app from working because Jets might have the right permissions. For example, if you accidentally remove permissions for CloudWatch Logs, then Lambda won't be able to write to them. It makes it quite difficult to debug. It's your responsibility to ensure that the policy has the correct permissions.

## CloudFormation IAM Policy Docs

The IAM Policy settings are like a DSL that Jets compiled to AWS IAM Document structures and are added to the CloudFormation templates. For more details on a raw IAM Policy document, see here.

* [AWS IAM Policies and Permissions docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html#access_policies-json)
* [CloudFormation IAM Policy reference docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-iam-policy.html)

{% include iam/app-vs-deploy-note.md %}
