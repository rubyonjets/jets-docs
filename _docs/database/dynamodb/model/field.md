---
title: DynamoDB Dynomite Field
nav_text: Field
category: dynamodb-model
order: 2
---

The `fields` and `field` methods are how you declare fields.

app/models/product.rb

```ruby
class Product < ApplicationItem
  fields :category,
         :sku,
         :name,
         :price, type: :integer
  field :stock_quantity, type: :integer, default: 1
  field :ttl, type: :integer, default: -> { 1.hour.from_now.to_i }
  field :sold_at, type: :time
end
```

You can use the `fields` method to declare multiple fields at the same time.

You can also use the `field` method to declare each field and provide additional options like `type` and `default`.

* The `type` option does additional typecasting. See: [Typecasting]({% link _docs/database/dynamodb/model/typecasting.md %})
* The `default` option can accept a Proc or symbol for a method name to be called.

## Undeclared Fields Behavior

If you assign values directly to attributes on undeclared model fields like so:

```ruby
post = Post.first
post.attributes[:foo] = "bar" # foo is not a declared field
post.save # dynomite does some checking
```

Dynomite will process them in different ways.

1. **warn**: Removes the undeclared attributes but logs a warning.
2. **silent**: Silently remove the undeclared attributes. This prevents "dirty" data from getting your table from a mass assignment.
3. **error**: Raises an error.
4. **allow**: Allows the undeclared attributes to be assigned.

The default behavior is `warn`. Dynomite checks for declared fields upon **saving** the item.

You can configure the behavior with:

config/initializers/dynomite.rb

```ruby
Dynomite.configure do |config|
  # available: warn silent error allow
  config.undeclared_field_behavior = :warn # default: will remove the attributes and log a warning
end
```
On the reading side, with attributes that do not have a `field` declaration, you can access and read it by reading the attribute via more direct methods:

* Hash notation: post[:foo]
* attributes: `attributes[:foo]`
* read_attribute: `read_attribute(:foo)`

Since there is no `field` declaration, no dot method is available. You are directly accessing and setting attributes.

It's recommended to use `field` declarations for clarity.
