---
title: DynamoDB Dynomite Indexing
nav_text: Indexing
category: dynamodb
subcategory: dynamodb-indexes
order: 6
---

## Indexes Summary

DynamoDB has a lot of different indexes.

1. Primary Key Index
2. Local Secondary Index
3. Global Secondary Index

* **Primary Key**: A primary key is either: A Partition Key only or Both a Partition Key and Sort Key (Also known as a Composite Key). It must be created at table creation time and cannot be changed. The primary key is under `.Table.KeySchema` when you describe the table. The partition key type is `Hash`, and the sort key type is `Range`.
* **Local Secondary Indexes**: LSIs must be a Composite Key and have the *same partition key* as the primary key. It can use any other Sort Key, though. The Sort Key is required. It must be created at table creation time and cannot be changed. There is a limit of 5.
* **Global Secondary Indexes**: GSIs are like Primary Keys. You can choose any attribute for the Partition Key and, optionally, any Sort Key. You can create GSIs at any time. They can take quite a while to create, 8ms or so, but do not block any other database operations during that time. GSIs are like copies of the table. There is a limit of 20.

By definition, composite keys are indexes that have a sort key also.

## It's All About Indexing

If you want fast queries, it's all about indexing. This is why DynamoDB forces us to explicitly use separate [scan](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#scan-instance_method) and [query](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method) operations. It forces us to acknowledge that we're doing a slow scan or a fast query 🤣.

Dynomite prints a warning message about the slow scan operation if a scan occurs. You can then either change the querying logic or add an index. Adding the right index based on the columns your app is querying will keep your app fast.

## Example of Indexes

To help understand the different types of indexes, here is an example:

    products table:
    primary key: category (partition_key), sku (sort_key)
    LSI: category (partition_key), name (sort_key)
    GSI: updated_at (partition_key)

Here's another example:

    posts table:
    primary key: id (partition_key)
    GSI: author (partition_key), updated_at (sort_key)

Notice for `posts` since the Primary Key only consists of the `id` Partition Key, which will be unique; there's no point in making the Primary Key a Composite Key with a Sort Key. Sort keys are only useful if the partition key is a "category".

{% include database/dynamodb/primary-key-preference.md %}

## Dynomite Smart Use of Indexes

With DynamoDB, you must usually be explicit about performing a **fast** operation with the `query` method and specifying an index. If an index is unavailable, you can still find items by explicitly performing a **slow** operation with the `scan` method. This makes sense from a performance perspective, but it's non-ideal from a developer interface perspective.

If there's an index of some form, IE: the primary index, local secondary index, or global secondary index, dynomite uses the index automatically and calls the fast `query` operation instead of the slower `scan` operation. Dynomite will print a warning message if the slow scan operation is being used. Here's an example:

```ruby
> Product.where(category: "Electronics").to_a
I, [2023-07-29T00:59:21.680888 #66166]  INFO -- : WARN: No index found. Using slow scan operation. Consider creating an index.
See: https://rubyonjets.com/docs/database/dynamodb/indexes/
=> [#<Product:0x00007fbce08672d0 >]
>
```

Note: We're calling `to_a` to force the load since `where` returns a lazy Enumerator.

If there's an index, the warning message does not get printed.

```ruby
> Product.where(category: "Electronics").to_a
=> [#<Product:0x00007fbce08672d0 >]
>
```

