---
title: DynamoDB Dynomite Querying Find
nav_text: Find
category: dynamodb-querying
order: 3
---

## Find Uses get_tiem

You provide the unique id to the `find` method. Example:

```ruby
Product.find("product-Q1xnDhRzIYduWAtU")
```

Underneath the hood, `find` uses then the [get_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#get_item-instance_method) to fetch the data using the Primary Key fields, usually `id`.

Related: [model id]({% link _docs/database/dynamodb/model/id.md %})

## Hash Notation and Options

You can also use a Hash to provide the Primary Key:

```ruby
Post.find("post-TiphkbRQS2pfwMBB")     # partition_key id is discovered
Post.find(id: "post-TiphkbRQS2pfwMBB") # partition_key is specified as id
```

You can provide additional `get_item` options as the last Hash argument.

```ruby
Post.find("post-TiphkbRQS2pfwMBB", consistent_read: true) # partition_key is discovered
Post.find({id: "post-TiphkbRQS2pfwMBB"}, consistent_read: true) # partition_key is specified as id
```

## Composite Key

When the table has a Partition Key and Sort Key, you must specify both as they make up the full Primary Key. For example, given a Product model with a `partition_key: category` and `sort_key: sku`. You can find a Product like so:

```ruby
Product.find(category: "Electronics", sku: 101)
```

You can provide additional `get_item` options as the last Hash argument.

```ruby
Product.find({category: "Electronics", sku: 101}, consistent_read: true)
```

If you do not provide both partition_key and sort_key values, you'll get an error:

```ruby
> Product.find("Electronics")
.../gems/aws-sdk-core-3.180.0/lib/seahorse/client/plugins/raise_response_errors.rb:17:in `call': The provided key element does not match the schema (Aws::DynamoDB::Errors::ValidationException)
```

## Find Multiple Results

Usually, `find` returns a single item. However, you can also use `find` and return multiple results. You can pass an Array or splat arguments in different forms.

```ruby
id1, id2 = Post.first.id, Post.last.id
Post.find(id1, id2)
Post.find([id1, id2])
Post.find([{id: id1}, {id: id2}])
# Composite Keys
Product.find([{category: "Electronics", sku: 101}, {category: "Electronics", sku: 102}])
```

Underneath the hood, dynomite calls fast `get_item` in parallel threads in batches of 100. This can be configured with an env var `DYNOMITE_GET_ITEMS_THREADS=100`.

## find cheatsheat

Here are different ways to use find. Post has a partition key only, and Product has a composite key (both partition key and sort key).

```ruby
Post.find("post-TiphkbRQS2pfwMBB")
Post.find(id: "post-TiphkbRQS2pfwMBB")
Post.find("post-TiphkbRQS2pfwMBB", consistent_read: true)
Post.find({id: "post-TiphkbRQS2pfwMBB"}, consistent_read: true)
Product.find(category: "Electronics", sku: 101)
Product.find({category: "Electronics", sku: 101}, consistent_read: true)
```

{% include database/dynamodb/find-vs-find-by.md %}
