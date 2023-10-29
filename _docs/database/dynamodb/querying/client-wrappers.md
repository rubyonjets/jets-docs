---
title: DynamoDB Dynomite General Low-Level Client Wrappers
nav_text: Client Wrappers
category: dynamodb-querying
order: 9
---

## Low-Level Client Wrapper Methods

The `scan` and `query` are low-level methods corresponding to the raw DynamoDB Client methods. They add some conveniences:

* add the `table_name` to the params
* return model items instances like `Product` instead of a raw item from `resp.table.items`.

### Scan

```ruby
products = Product.scan(
  filter_expression: "#name IN (:name1, :name2)",
  expression_attribute_names: {"#name"=>"name"},
  expression_attribute_values: {":name1"=>"Smartphone",":name2"=>"Laptop"},
)
products # Array of Product items.  [<Product>, <Product>, ...]
```

### Query

```ruby
products = Product.query(
  index_name: "category-name-index",
  expression_attribute_names: {"#category"=>"category", "#name"=>"name"},
  expression_attribute_values: {":category"=>"Books", ":name"=>"Novel"},
  key_condition_expression: "#category = :category AND #name = :name",
)
products # Array of Product items.  [<Product>, <Product>, ...]
```

Here are a few more [low-level examples](https://gist.github.com/tongueroo/bd3d2918d472aeb3cc4db68f49e58bcd).

## Even Lower-Level Client

If you want to use direct aws-sdk-dynamodb client directly. It's available via `client`.

```ruby
❯ jets console
> Product.client
=> #<Aws::DynamoDB::Client>
>
```

You have access to all the raw underlying [aws-sdk-dynamodb methods](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html). With the raw client, you need to specify the table name and convert the raw items response to a model object.
