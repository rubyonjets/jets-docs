---
title: DynamoDB Dynomite Querying with Explicit Index Name
nav_text: Index Name
category: dynamodb-querying
order: 7
---

You can use `index_name` to tell dynomite to use an explicit index.

Let's say a products table has 2 GSI indexes: `name-index`and `price-index`.

```ruby
Product.where(name: "Smartphone", price: 500)
```

The query above would use the first index found. If you want to be explicit about the index use, you can use:

```ruby
Product.where(name: "Smartphone", price: 500).index_name("price")
```

## Index Name Suffix

Dynomite indexes have a `-index` suffix by convention. This is because DynamoDB requires index names with at least 3 characters. Specifically, the field `id` would not have enough characters for an index name of `id` and throws an error. The name `id-index` works, though. The `index` is smart enough to add the `-index` suffix when needed. These all work.

```ruby
Product.where(name: "Smartphone", id: "product-h64ST7qr6paaNBKd").index_name("id")
Product.where(name: "Smartphone", id: "product-h64ST7qr6paaNBKd").index_name("id-index")
Product.where(name: "Smartphone", price: 500).index_name("price")
Product.where(name: "Smartphone", price: 500).index_name("price-index")
```

You can disable behavior and not add a suffix at all with:

```ruby
Product.where(name: "Smartphone", price: 500).index_name("price-index", suffix: false)
Product.where(name: "Smartphone", price: 500).index_name("name-index", suffix: false)
```

## Fallback When Index Not Found

When the specified `index` is not found, dynomite falls back and try to auto-discover an index to use. If no indexes are auto-discovered, it falls back to the scan operation.

## Non-Index Fields Goes to Filter Expressions

When additional non-indexed fields are specified, like stock_quantity in this case, they get added to the `filter_expresssion` parameter appropriately. Example:

```ruby
> Product.where(name: "Smartphone", price: 500, stock_quantity: 50).to_params
=> {:expression_attribute_names=>{"#name"=>"name", "#price"=>"price", "#stock_quantity"=>"stock_quantity"},
 :expression_attribute_values=>{":name"=>"Smartphone", ":price"=>500, ":stock_quantity"=>50},
 :filter_expression=>"#price = :price AND #stock_quantity = :stock_quantity",
 :key_condition_expression=>"#name = :name",
 :table_name=>"demo-dev_products",
 :index=>"name-index"}
>
```

Note only one index can be used at a time. The other indexed field `price` getss added to the `filter_expresssion`.
