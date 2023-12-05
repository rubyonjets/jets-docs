---
title: DynamoDB Dynomite Querying Limit
nav_text: Limit
category: dynamodb-querying
order: 6
---

You can limit the number of results with `limit`. Here are some chained examples.

Example:

```ruby
Product.limit(2).map(&:name)
Product.all.limit(2).map(&:name) # also works
Product.where(category: "Electronics").limit(2).map(&:name)
```

## Limit Implementation

The limit is **not** sent to the DynamoDB as part of the [query](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method) or [scan](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#scan-instance_method) operation. Dynomite sends paginated requests to the AWS API at the default limit sdk setting. AWS DynamoDB scans up to 1MB per page. Dynomite checks the limit at the Ruby level once the total count reaches the limit. From a developer interface perspective, I believe this is what the user would expect.
