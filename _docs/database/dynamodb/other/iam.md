---
title: DynamoDB Dynomite IAM Policy
nav_text: IAM
category: dynamodb-other
order: 4
---

If you're Lambda and DynamoDB, the Lambda Functions will need IAM access to the DynamoDB service.

## IAM Errors Example

Dynomite makes calls like `describe_table` to discover index information and for your models. Without IAM permission, you'll see an error like this:

    2023-08-08 00:18:26 UTC 2023/08/08/[$LATEST]7cc99b57441c41c7b748b538c8b41c61 {
      "errorMessage": "User: arn:aws:sts::111111111111:assumed-role/demo-dev-IamRole-9MTX07A9DH9D/demo-dev-controller is not authorized to perform: dynamodb:DescribeTable on resource: arn:aws:dynamodb:us-west-2:111111111111:table/demo-dev_schema_migrations because no identity-based policy allows the dynamodb:DescribeTable action",
      "errorType": "Init<Aws::DynamoDB::Errors::AccessDeniedException>",
      "stackTrace": [
        "/opt/ruby/gems/3.2.0/gems/aws-sdk-core-3.180.2/lib/seahorse/client/plugins/raise_response_errors.rb:17:in `call'",
        "/opt/ruby/gems/3.2.0/gems/aws-sdk-dynamodb-1.93.1/lib/aws-sdk-dynamodb/plugins/simple_attributes.rb:119:in `call'",

You'll also need permissions for calls like [get_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#get_item-instance_method), [query](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method), and [scan](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#scan-instance_method), etc.

## Jets Application-wide: Override but Keep Default

Here's an [Application-wide IAM policy]({% link _docs/iam-policies.md %}/#application-wide-iam-policy) that provides DynamoDB access

config/application.rb

```ruby
Jets.application.configure do |config|
  config.iam_policy = [
    {
      action: ["dynamodb:*"],
      effect: "Allow",
      resource: "arn:aws:dynamodb:#{Jets.aws.region}:#{Jets.aws.account}:table/#{Jets.project_namespace}*",
    }
  ]
end
```

This adds to the existing default/built-in Jets Lambda Function IAM Policy.
