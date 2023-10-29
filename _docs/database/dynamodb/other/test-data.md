---
title: DynamoDB Dynomite Querying Example Test Data
nav_text: Test Data
category: dynamodb-other
order: 2
---

Here's some example data and a cheatsheet that can be useful for testing.

category | sku | name | price | stock_quantity
---|---|---|---|---
Electronics | 101 | Smartphone | 500 | 50
Electronics | 102 | Laptop | 1000 | 20
Clothing | 201 | T-Shirt | 25 | 100
Clothing | 202 | Jeans | 50 | 50
Books | 301 | Novel | 15 | 200
Books | 302 | Textbook | 75 | 30

## Migration to Create Table

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key :category    # required
      t.sort_key      "sku:number" # optional: makes the primary key a composite key

      # By definition, LSIs are composite keys
      t.add_lsi :name          # partition_key is :category by inference, sort_key is name
      t.add_lsi "price:number" # partition_key is :category by inference, sort_key is price
    end
  end
end
```

## Code to Create

dynamodb/seeds.rb

```ruby
Product.put(category: "Electronics", sku: 101, name: "Smartphone", price: 500, stock_quantity: 50)
Product.put(category: "Electronics", sku: 102, name: "Laptop", price: 1000,stock_quantity:  20)
Product.put(category: "Clothing", sku: 201, name: "T-Shirt", price: 25, stock_quantity: 100)
Product.put(category: "Clothing", sku: 202, name: "Jeans", price: 50, stock_quantity: 50)
Product.put(category: "Books", sku: 301, name: "Novel", price: 15, stock_quantity: 200)
Product.put(category: "Books", sku: 302, name: "Textbook", price: 75, stock_quantity: 30)
```

## Code to Query

```ruby
Product.where(category: "Electronics", sku: 101, name: "Smartphone", price: 500, stock_quantity: 50)
Product.where(category: "Electronics", sku: 101) # same as above because product is
```

