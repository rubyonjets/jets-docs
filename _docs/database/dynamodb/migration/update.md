---
title: DynamoDB Dynomite Migrations Update Table Examples
nav_text: Update
category: migration
order: 2
---

## Update Table

When update is in the name, an `update_table` migration is created.
dynamodb/migrate/20230727232723-update_posts.rb

```ruby
class UpdateProducts < Dynomite::Migration
  def up
    update_table :products do |t|
      t.add_gsi :updated_at
    end
  end
end
```

This is useful for adding GSI, Global Secondary Indexes. GSIs take a few minutes to add. See [Wait Times]({% link _docs/database/dynamodb/other/wait-times.md %})

## Global Secondary Index Composite Key

Here's an example that adds an index.

```ruby
class UpdateComments < Dynomite::Migration
  def up
    update_table :comments do |t|
      t.add_gsi partition_key: :post_id, sort_key: :updated_at
    end
  end
end
```

## Multiple GSIs: Multiple Operations

You cannot create multiple GSIs within the *same* `update_table` call. But you can call `update_table` times in the same migration. Note: Each GSIs can take 8m+ to add.

```ruby
class UpdateProducts < Dynomite::Migration
  def up
    update_table :products do |t|
      t.add_gsi partition_key: "price"
    end
    update_table :products do |t|
      t.add_gsi partition_key: "stock_quantity"
    end
    update_table :products do |t|
      t.remove_gsi partition_key: "id", sort_key: "updated_at"
    end
  end
end
```

## Update GSI

```ruby
class UpdateComments < Dynomite::Migration
  def up
    update_table :products do |t|
      t.update_gsi(
        partition_key: "id"
        provisioned_throughput: {
          read_capacity_units: 1, # required
          write_capacity_units: 1, # required
        }
      )
    end
  end
end
```
