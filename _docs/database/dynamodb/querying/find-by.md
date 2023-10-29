---
title: DynamoDB Dynomite Querying Find By
nav_text: Find By
category: dynamodb-querying
order: 4
---

## Primary Key

Dynomite will look for the primary key and then use [find]({% link _docs/database/dynamodb/querying/find.md %}) underneath the hood if Primary Key fields are found. If the Primary Key is not found, it'll use [where]({% link _docs/database/dynamodb/querying/where.md %}).

```ruby
> Product.find_by(category: "Electronics", sku: 101)
=>
#<Product:0x00007f14ca8981a0
 @attrs={"updated_at"=>"2023-08-03T16:17:50Z", "created_at"=>"2023-08-03T16:17:50Z", "name"=>"Smartphone", "stock_quantity"=>0.5e2, "category"=>"Electronics", "price"=>0.5e3, "sku"=>0.101e3},
 @new_record=false>
>
```

If multiple results are found, IE: A products table with a category and sku. It will return the first found result. Example:

```ruby
> Product.find_by(category: "Electronics")
=>
#<Product:0x00007f14c9c1ab58
 @attrs={"updated_at"=>"2023-08-03T16:17:50Z", "created_at"=>"2023-08-03T16:17:50Z", "name"=>"Smartphone", "stock_quantity"=>0.5e2, "category"=>"Electronics", "price"=>0.5e3, "sku"=>0.101e3},
 @new_record=false>
>
```

## find_by cheatsheat

There are different ways to use `find_by`. Post has a partition key only, and Product has a composite key (both partition key and sort key) in these examples.

```ruby
Product.find_by(category: "Electronics", sku: 101)
Product.find_by(category: "Electronics")
Product.find_by(category: "Electronics", sku: 101, name: "Smartphone", price: 500, stock_quantity: 50)
Product.find_by(price: 500, stock_quantity: 50)
```

{% include database/dynamodb/find-vs-find-by.md %}
