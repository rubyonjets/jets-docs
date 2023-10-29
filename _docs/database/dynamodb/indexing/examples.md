---
title: DynamoDB Dynomite Adding Indexes Examples
nav_text: Examples
category: dynamodb-indexes
order: 2
---

We'll show you how to add indexes in these docs.

## Global Secondary Indexes

Global Secondary Indexes are great in terms of flexibility. You can use any attribute as the Primary Key. GSIs are essentially copies of the main table. So the more data you have, the longer it may take. GSI tables cannot use consistent reads.

## GSI update_table

Creating each global secondary index can take up to [several minutes]({% link _docs/database/dynamodb/other/wait-times.md %}).

Additionally, DynamoDB only allows adding one GSI at a time. If you try to add 2 GSI indexes at a time or add another index while one is still in "Creating" status, you'll get this error:

> Subscriber limit exceeded: Only 1 online index can be created or deleted simultaneously per table

Because you can only add one GSI index at a time, if you want to add multiple GSIs in the same migration file, you must call `update_table` separately. Example:

```ruby
class UpdateProducts < Dynomite::Migration
  def up
    update_table :products do |t|
      # Up to 20 GSIs per table are allowed
      t.add_gsi :id
    end
    # A separate update_table call since only one index can be added at a time
    update_table :products do |t|
      t.add_gsi :updated_at
    end
    # Example of composite key index
    update_table :products do |t|
      t.add_gsi partition_key: :category, sort_key: :updated_at
    end
    update_table :products do |t|
      t.add_gsi "price:number" # number -> N
    end
end
```

Here's another shorthand syntax to create multiple GSI indexes. The `add_gsi` also makes separate `update_table` calls.

```ruby
class UpdateProducts < Dynomite::Migration
  def up
    # add_gsi TABLE_NAME, *ARGS
    add_gsi :products, :id
    add_gsi :products, :updated_at
    add_gsi :products, partition_key: :category, sort_key: :updated_at
    add_gsi :products, "price:number"
  end
end
```

## GSI create_table

One trick to speed things up is to create the GSI indexes as part of the create_table operation. It's significantly faster and takes about 20s. You can add multiple indexes at the same time also.

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key :category
      t.sort_key  "sku:number"  # optional
      # Can create up to 20 GSIs
      t.add_gsi :price          # partition key is price
      t.add_gsi :stock_quantity # partition key is price
      t.add_gsi partition_key :category, sort_key: :price
    end
  end
end
```

## Local Secondary Indexes

LSIs can only be created at table creation time and must be Composite Keys be definition.

## LSI create_table

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key "category:string" # required
      # Can create up to 5 LSIs according to docs
      t.add_lsi :price # price is sort key, the partition_key category is inferred
    end
  end
end
```

Notes from docs: [create_table](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#create_table-instance_method)

> One or more local secondary indexes (the maximum is 5) to be created on the table. Each index is scoped to a given partition key value. There is a 10 GB size limit per partition key value
