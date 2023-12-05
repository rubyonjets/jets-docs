---
title: DynamoDB Dynomite Migrations Delete Table Examples
nav_text: Delete
category: migration
order: 3
---

## Delete Table

To create a migration that deletes a table

    jets dynamodb:generate delete_products

dynamodb/migrate/20230801191725-delete_products.rb

```ruby
class DeleteProducts < Dynomite::Migration
  def up
    delete_table :products
  end
end
```
Deleting tables is very fast and takes only a few seconds.
