---
title: DynamoDB Dynomite Querying Consistent Read
nav_text: Consistent Read
category: dynamodb-querying
order: 8
---

## Consistent Read

You can enable `consistent_read`, but note consistent reads are not supported by GSI indexes. So a `scan` will be performed instead even if an index is found.

```ruby
# There's a GSI index for category. GSI do not support consistent read. So it'll fallback to scan
Product.where(category: "Electronics").consistent_read
```

DynamoDB only supports `consistent_read` with primary keys. So, if you want to ensure you do not `scan` and perform a `query`, provide the entire primary key. Example:

```ruby
# The full primary key is provided so that a query can take place
Product.where(category: "Electronics", sku: 100).consistent_read
```

## Force Scan

If you need to force a scan operation, you can use `force_scan`.

```ruby
Product.where(category: "Electronics").force_scan # will scan even though there's an index on category
```
