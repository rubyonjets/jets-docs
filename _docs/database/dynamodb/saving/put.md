---
title: DynamoDB Dynomite Put
nav_text: Put
category: dynamodb-saving
order: 3
---

## Examples

The `put` method can also be used to save items. It uses [put_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#put_item-instance_method), which **requires** the full Primary Key. It does not check for existence. It simply overrides existing items.

You must always provide the entire Primary Key. If you do not, an error is raised. Here the Primary Key is `id`.

```ruby
Post.put(id: "post-1", title: "post 1")
Post.put!(id: "post-1", title: "post 1")
```

If it's a Composite Key, you must provide both the Partition Key and Sort Key. Here the Partition Key is `category` and the Sort Key is `sku`.

```ruby
Product.put(category: "Electronics", sku: 100)
```

## Callbacks and Validations

The `put` also runs callbacks and validations. You can also disable validations with `validate: false`.

```ruby
Post.put({id: "post-1", title: "post 1"}, {validate: false})
```
