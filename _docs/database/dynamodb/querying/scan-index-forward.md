---
title: DynamoDB Dynomite Querying Scan Index Forward
nav_text: Scan Forward
category: dynamodb-querying
order: 6
---

You can use `scan_index_forward` and `scan_index_backward` to change the ordering of the results. Examples:

```ruby
Product.where(category: "Electronics", sku: 101).scan_index_forward.first
Product.where(category: "Electronics", sku: 101).scan_index_forward(false).first
Product.where(category: "Electronics", sku: 101).scan_index_backward.first
Product.where(category: "Electronics").scan_index_backward.first
```

The Primary Key needs to have Sort Key for `scan_index_forward` to work. This is the way DynamoDB works.

## Faster Last Method

Dynomite provides a `last` method that returns the last item of a table, IE: `Product.last`. Unfortunately, to generalize it, it must do a [scan](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#scan-instance_method) operation and iterates through all the pages. This can be slow for large tables.

If you can scope the query by the Partition Key and Sort Key, it's more efficient to use `scan_index_backward.first` to grab the last item. The [query](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method) operation will be used, and the "last" item is the "first" item. So we don't even have to paginate through all the pages and make multiple API calls for large result sets.
