---
title: DynamoDB Dynomite Querying Where
nav_text: Where
category: dynamodb-querying
order: 1
---

## Querying is Lazy

We'll start with the common method `where` and introduce the resulting Relation object. Dynomite querying methods are generally lazy. It returns a **lazy Enumerator Relation** object. This allows you to build up the query expression before making the DynamoDB API calls to load the items. Example:

```ruby
❯ jets console
> Post.where(title: "title 1").class
=> Dynomite::Item::Query::Relation
```

The Relation object contains attributes to query.

```ruby
> Post.where(title: "title 1")
=> #<Dynomite::Item::Query::Relation:0x00007f615b4fcea0 @query={:where=>[{:title=>"title 1"}]}>
```

You can chain the `where` methods.

```ruby
> Post.where(title: "title 1").where(desc: "desc 1")
=> #<Dynomite::Item::Query::Relation:0x00007f615dc1b270 @query={:where=>[{:title=>"title 1"}, {:desc=>"desc 1"}]}>
```

The `and` method is aliased to `where`. These are all the same.

```ruby
Post.where(title: "title 1").where(desc: "desc 1")
Post.where(title: "title 1").and(desc: "desc 1")
Post.where(title: "title 1", desc: "desc 1")
```

## Ruby Enumerable Compatibility

Since the Relation object is an Enumerable object, you can use Ruby methods to iterate, traverse, and manipulate the collection of DynamoDB items. Ruby Enumerable methods:

```ruby
each map select reject reduce any? all? sort count include?
```

Items are loaded at the moment those methods are used. IE: You do something like iterate through the collection with `.each` or call `.first`. You can also force the lazy Enumerator to load with `.to_a` or `.force`. Here are ways to load the actual records.

```ruby
Post.where(title: "title 1").each { |post| p post }
Post.where(title: "title 1").first
Post.where(title: "title 1").to_a
Post.where(title: "title 1").force
Post.where(title: "title 1").count
```

And an example with some output:

```ruby
> Post.where(title: "title 1").first
=> #<Post:0x00007f615b6f7e58 @attrs={"updated_at"=>"2023-07-28T00:30:49Z", "created_at"=>"2023-07-28T00:30:49Z", "id"=>"f74de472", "title"=>"title 1", "desc"=>"desc 1"}, @new_record=false>
```

## Indexes Automatically Used

If there's an index on one of the fields, it's automatically discovered and used as part of a fast [query](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method) operation. Example:

```ruby
> Post.index_names
=> ["title-index"]
> Post.where(title: "title 1").first # title-index is automatically used
```

The first index that is discovered is used.

{% include database/dynamodb/index-precedence.md %}

## Primary Key is Composite Key: Partition and Sort Key

When there is a primary key that is a composite key (both partition_key and sort_key), both keys need to be provided to avoid a slow [scan](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#scan-instance_method) operation. Example:

```ruby
Product.where(category: "Electronics", price: 100).to_params
```

Since the `parition_key` is `category` and `sort_key` is `sku`, the composite key index cannot be used. If there are individual GSI indexes on either field like `category` or `price`, then those one indexes will be used though.

## See to_params

Dynomite works by building up the query in memory and then calling `to_params` before sending the request to DynamoDB. You can see the params and debug by calling the `to_params` method. It can be useful to see what parameters will be sent to the DynamoDB Ruby SDK API.

```ruby
> Product.where(category: "Electronics", sku: 101).to_params
=> {:expression_attribute_names=>{"#category"=>"category", "#sku"=>"sku"},
 :expression_attribute_values=>{":category"=>"Electronics", ":sku"=>101},
 :key_condition_expression=>"#category = :category AND #sku = :sku",
 :table_name=>"demo-dev_products"}
>
```

## Low-Level Methods

If you need more control over querying, you can drop down to the low-level wrapper `scan` and `query` methods. See: [Low-Level Query Methods]({% link _docs/database/dynamodb/querying/client-wrappers.md %}).

