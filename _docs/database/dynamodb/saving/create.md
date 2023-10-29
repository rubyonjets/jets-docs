---
title: DynamoDB Dynomite Create
nav_text: Create
category: dynamodb-saving
order: 2
---

## Examples

```ruby
Post.create(title: "post 1")
Post.create!(title: "post 2")

Post.create(title: "post 3") do |post|
  post.category = "ruby"
end
```

## Checks for Uniqueness

```ruby
> post = Post.create(id: "post-ITWxoTTYKKXWtCrX")
dynomite/item/query/write/save.rb:27:in `handle_conditional_check_failed_exception':
A Post with the primary key {:id=>"post-ITWxoTTYKKXWtCrX"} already exists (Dynomite::Error::RecordNotUnique)
```

With DynamoDB, uniqueness is based on the primary key. If you update an item with the same Primary Key, the same item gets overwritten. If you try to create 2 items with the same Primary Key, dynomite will raise a `Dynomite::Error::RecordNotUnique` error.

An error will also be raised using `new`

```ruby
> post = Post.new(id: "post-ITWxoTTYKKXWtCrX")
> post.save
dynomite/item/query/write/save.rb:27:in `handle_conditional_check_failed_exception':
A Post with the primary key {:id=>"post-ITWxoTTYKKXWtCrX"} already exists (Dynomite::Error::RecordNotUnique)
```

Interestingly, under the hood, DynamoDB uses `put_item` with a [`condition_expression` and `attribute_not_exists`](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html#Expressions.ConditionExpressions.PreventingOverwrites) to check if the record already exists. So uniqueness is ensured at the database level.

Here's another example with a Primary Key that is a Composite Key.

```ruby
> Product.create(category: "Electronics", sku: 101, name: "Smartphone", price: 500, stock_quantity: 50)
dynomite/item/query/write/save.rb:27:in `handle_conditional_check_failed_exception':
A Product with the primary key {:category=>"Electronics", :sku=>101} already exists (Dynomite::Error::RecordNotUnique)
```

## Auto-Generates Friendly Id

A unique id is generated if you do not specify the Partition Key value.

    post = Post.create(title: "title 1")
    post.id # => post-yoZGM7woMlpwCe2d

The id prefix is the underscore class name by default. It can be overridden with id_prefix though it's not recommended.

```ruby
class Post < ApplicationItem
  id_prefix("my_post")
end
```

## Auto-Generates String and Number for Partition and Sort Key

If the primary key is not set, a random one is generated for both the `partition_key` and the optional `sort_key`. Here's how it works.

* If the field is a `string`, a random 40-char string is generated IE: `a3775e920a997814f6ffc14dfed631095d63e09f`
* If the field is a `number`, a random 40-length number that does not start with zero is generated. IE: `1554754521804542800906134042971319052310`
* If the field is named `id`, then a friendly name is generated based on the class name. IE: `post-kGLAV8PZuYwXYBGQ`
