---
title: DynamoDB Dynomite Querying Expressions Comparisons Functions
nav_text: Expressions
category: dynamodb-querying
order: 2
---

DynamoDB supports some comparison and function expressions. Here's the [AWS Comparison operator and function reference](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html).

## Where Examples

```ruby
Product.where(category: "Electronics", price: 1000)
Product.where(category: "Electronics", "price.lt": 1000)
```

The `and` is an alias of `where`. It's all chainable and makes for some interesting code.

```ruby
Product.where(category: "Electronics").and("price.lt": 1000)
Product.where(category: "Electronics").and.where("price.lt": 1000)
Product.where(category: "Electronics").and.where.not("price.lt": 1000)
```

## Comparision Examples

```ruby
Product.where("price.lt": 500)
Product.where("price.gt": 500)
Product.where("price.gt": 1, "price.lt": 500)
Product.where("price.between": [100,500])
Product.where("price.in": [100,200,300])
Product.where("category.begins_with": "Elect")
Product.where(category: "Electronics").and("updated_at.gt": 10.days.ago)
```

For any of the comparisons, you can add a prefix `not_`, and Dynomite adds the `NOT` to the expression to negate the condition. Examples:

```ruby
Product.where("price.not_between": [100,500])
Product.where("price.not_in": [100,200,300])
Product.where("category.not_begins_with": "Elect")
```
## Function Examples

The use of [DynamoDB functions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html#Expressions.OperatorsAndFunctions.Functions) in expressions will result in having to use a `scan` operation. This is similar to how using MySQL functions results in not using the MySQL indexes. It can sometimes be more optimal to avoid the more advanced expressions so that Dynomite can use a DynamoDB index to query. You can then filter with PORO, plain-old Ruby object, with  Enumerable methods like `select`, `reject`, and `find` methods afterward.


```ruby
Product.where(category: "Electronics").attribute_exists('pictures.slide_view')
Product.attribute_exists('pictures.slide_view')
Product.attribute_not_exists('pictures.slide_view')
Product.attribute_type('pictures.slide_view', :string)
Product.begins_with("category", "Elect") # works for String
Product.contains("tags", "foo") # works for String, Set and List
Product.size_fn("category.gt", 100)
```

Dynomite uses the name `size_fn` for the DynamoDB function instead of `size` because `size` collide with the Ruby Enumerator method.

## Or Examples

For dynomite, `or` expressions will always result in a scan operation. This is because `key_condition_expression` does not support OR expressions. It also does not make sense to use a query with an index in the first pass with `key_condition_expression` and then use `filter_expression` in the second pass. The `key_condition_expression` and `filter_expression` are always AND with each other. So doing an OR without a scan is not possible.

```ruby
Product.where(category: "Electronics").or("price.gt": 1000)
Product.where(category: "Electronics").or(category: "Books")
Product.where("price.lt": 500).or("price.gt": 1000)
Product.where(name: "Smartphone").or(name: "Laptop")
```

The `or` will join the rest of the chain flatly. Each "where group" will be AND, and the `or` joins those conditions. Example:

```ruby
> Product.where(category: "Electronics", "price.gt": 100).or(category: "Books", "price.gt": 10).to_params
{:expression_attribute_names=>{"#category_0"=>"category", "#price_1"=>"price", "#category_2"=>"category", "#price_3"=>"price"},
 :expression_attribute_values=>{":category_0"=>"Electronics", ":price_1"=>100, ":category_2"=>"Books", ":price_3"=>10},
 :table_name=>"demo-dev_products",
 :filter_expression=>"( #category_0 = :category_0 AND #price_1 > :price_1 ) OR ( #category_2 = :category_2 AND #price_3 > :price_3 )"}
```

## Not Examples

```ruby
Product.not("category": "Electronics")
Product.not("category.in": ["Electronics", "Books"])
Product.not(category: "Electronics", price: 1000)
Product.where("price.gt": 1).not("price.lt": 500)
Product.where("category.not_in": ["Electronics", "Books"])
Product.where("price.gt": 100).where("category.not_in": ["Electronics", "Books"])
```

## Excluding Examples

```ruby
product1 = Product.first
product2 = Product.last
Product.excluding(product1, product2)
Product.where(category: "Electronics").excluding(product1, product2)
Product.where(category: "Electronics").excluding(product1.id, product2.id)
```

## More Advanced Low-Level and PartiQL

If the expressions above are not enough, you can drop down to lower-level methods:

* [Low-Level query and scan client wrappers]({% link _docs/database/dynamodb/querying/client-wrappers.md %})
* [PartiQL]({% link _docs/database/dynamodb/querying/partiql.md %})

Note: The low-level and PartiQL are not as eloquent as the Dynomite higher-level expression methods. You can also consider just filtering with the built-in Ruby Enumerable methods after first loading items from DynamoDB with a more straightforward query.