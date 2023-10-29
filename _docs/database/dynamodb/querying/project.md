---
title: DynamoDB Dynomite Querying Project Expression
nav_text: Project Expression
category: dynamodb-querying
order: 9
---

## Project Expression

You can use `project` or `project_expression` to "project" specific fields only.  Both strings and splat args work.

```ruby
Product.where(category: "Electronics").project(:id, :name, :category, :price)
Product.where(category: "Electronics").project("id, name, category, price")
Product.where(category: "Electronics").project("id, name", :category, :price) # mixing works too
```

Only the projected fields will be available. This is like using SQL `select` to grab only specific fields from the database.

```ruby
product = Product.where(category: "Electronics").project(:id, :name, :category).first
product.name  # available
product.price # unavailable. it was not projected
```

This optimization can save DynamoDB from retrieving more data than is needed over the wire.

## Start From or Exclusive Start Key

The `start_from` and `exclusive_start_key` are aliases of each other.

```ruby
product = Product.first
Product.start_from(product.primary_key)
Product.exclusive_start_key(product.primary_key)
```

Note, these are all aliases: `start start_from start_at exclusive_start_key`

## Pluck

The `pluck` is a quick way to `project` by only projecting the fields requested.

```ruby
> Product.where(category: "Electronics").pluck(:id)
=> ["product-Ti4AYV8kwmW8iEib", "product-f41iTl98xPLwrVr0"]
> Product.where(category: "Electronics").pluck(:id, :name)
=> [["product-Ti4AYV8kwmW8iEib", "Laptop"], ["product-f41iTl98xPLwrVr0", "Smartphone"]]
```

## Ids

You can use `ids` to quickly grab all the ids.

```ruby
Product.ids                                 # without key_condition will perform a scan
Product.where(category: "Electronics").ids  # will perform query given category index
```

The `ids` will perform a scan unless provided a `where` clause that can use an index and `key_condition`.

## Exists?

The `exists?` method can check for existence.

```ruby
Product.exists?
Product.where(category: "Electronics").exists?
```

Exists does an optimization by using `limit(1).first` internally.
