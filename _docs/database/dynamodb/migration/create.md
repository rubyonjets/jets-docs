---
title: DynamoDB Dynomite Migrations Create Table Examples
nav_text: Create
category: migration
order: 1
---

## Single Parition Key

You can use `dynamodb:generate` to create a starter migration file.

    ❯ jets dynamodb:generate create_posts
    Migration file created: dynamodb/migrate/20230728152326-create_posts.rb

dynamodb/migrate/20230728152326-create_posts.rb

```ruby
class CreatePosts < Dynomite::Migration
  def up
    create_table :posts do |t|
      t.partition_key :id # post-A2uxLhRzIYdqWwtN
      # Creating GSI with create_table is much faster than update_table. 20s vs 5m to 10m
      t.add_gsi :updated_at
    end
  end
end
```

The type of migration "create_table" is since the provided name, `create_posts`, starts with `create`. Also, in this example, the primary_key is the partition_key id. The id must be unique since only the partition_key is used.

## Composite Key

Here's an example where the primary_key is a "composite key". It has both partition_key and sort_key.

    ❯ jets dynamodb:generate create_products
    Migration file created: dynamodb/migrate/20230728152326-create_products.rb

dynamodb/migrate/20230728152326-create_products.rb

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key "category:string" # required
      t.sort_key "sku:number"    # both category + sku identifies uniqueness
      # Should add an index for the id field still
      t.add_gsi :id # product-A2uxLhRzIYdqWwtN
      t.add_gsi partition_key: :category, sort_key: :updated_at # product-A2uxLhRzIYdqWwtN
    end
  end
end
```

If the Primary Key is a Composite Key, then the combination identifies uniqueness. It's still useful to have an indexed id to lookup with one field. Dynomite always saves an id field for easy lookup.

Here are a few more create examples:

    jets dynamodb:generate create_products --partition-key category --sort-key sku:number
    jets dynamodb:generate create_posts --partition-key id # default attribute type is string
    jets dynamodb:generate create_comments --partition-key post_id:string --sort-key created_at:string

{% include database/dynamodb/primary-key-preference.md %}

## Local Secondary Index

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key "category:string" # required
      t.sort_key  "post_id:number"      # makes primary_key a composite key
      t.add_lsi("name:string")  # used as sort key, the partition key is inferred
      # t.add_lsi(sort_key: "name:string") # also works
    end
  end
end
```

## Using key_schema and attribute_definitions

Here's an example where of using `key_schema` and `attribute_definitions` directly.

```ruby
class CreateComments < Dynomite::Migration
  def up
    create_table :comments do |t|
      # Instead of using partition_key and sort_key you can set the
      # key schema directly also
      t.key_schema([
          {attribute_name: "id", :key_type=>"HASH"},
          {attribute_name: "created_at", :key_type=>"RANGE"}
        ])
      t.attribute_definitions([
        {attribute_name: "id", attribute_type: "N"},
        {attribute_name: "created_at", attribute_type: "S"}
      ])

      # set the billing mode to on-demand
      # t.billing_mode(:pay_per_request) # default for dynomite

      # Also other ways to set provisioned_throughput
      # t.provisioned_throughput(:read, 10)
      # t.provisioned_throughput(:write, 10)
      # t.provisioned_throughput(
      #   read_capacity_units: 5,
      #   write_capacity_units: 5
      # )
    end
  end
end
```

## Global Secondary Index

Here's an example where we create GSI indexes as part of table creation.

```ruby
class CreateComments < Dynomite::Migration
  def up
    create_table :comments do |t|
      t.partition_key :post_id # required
      t.sort_key  :created_at # optional
      t.add_gsi :updated_at
    end
  end
end
```

You can think of GSIs as copies of the original table.
