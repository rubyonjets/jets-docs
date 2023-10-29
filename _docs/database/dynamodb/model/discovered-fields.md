---
title: DynamoDB Dynomite Model Auto Discovered Fields
nav_text: Discovered Fields
category: dynamodb-model
order: 4
---

Field definitions can be auto discovered to a certain extent. Note, this feature is experimental and may be remove in the future.

## Enable Fields Auto-Discovery

Fields auto-discovery is disabled by default. To enable auto-discovery:

config/initializers/dynomite.rb

```ruby
Dynomite.configure do |config|
  config.discover_fields = true
end
```

The fields are auto-discover upon Jets boot time.

## Auto Discovered Field Definitions

DynamoDB tables are not entirely oblivious of a schema. There's some schema information that must be set for primary keys (partition_key and or sort_key) and keys for LSIs or GSIs for [Indexing]({% link _docs/database/dynamodb/indexing.md %}).  Basically, whenever an index is added, the table's `attribute_definitions` must include the new index's key elements or fields.

The table's `attribute_definitions` contain "schema" information. Dynomite can use `attribute_definitions` to set field setters and getters for your models automatically. This spares you from having to declare all fields.

For example, given:

    $ aws dynamodb describe-table --table-name demo-dev_products | jq -r '.Table.AttributeDefinitions[].AttributeName'
    category
    price
    sku
    name

Then the Product class would automatically have all of these fields: `category price sku name`.  They are discovered at jets boot time. To be clear, you do not have to use the `field` method to declare them.

app/models/product.rb

```ruby
class Product < ApplicationItem
  # fields :category, :price, :sku, :name # commented out because it's not needed
  # the fields are automatically discovered
end
```

You can inspect the field names with `jets console`

```ruby
$ jets console
> Product.field_names
=> [:category, :created_at, :id, :price, :sku, :name, :updated_at]
> Product.attribute_definitions
=>
[#<struct Aws::DynamoDB::Types::AttributeDefinition attribute_name="category", attribute_type="S">,
 #<struct Aws::DynamoDB::Types::AttributeDefinition attribute_name="price", attribute_type="N">,
 #<struct Aws::DynamoDB::Types::AttributeDefinition attribute_name="sku", attribute_type="N">,
 #<struct Aws::DynamoDB::Types::AttributeDefinition attribute_name="name", attribute_type="S">,
>
```

## Explicitly Set Fields

Of course, if you have some fields not covered by indexes, you can manually set the fields anyway. Explicitly setting auto-discovered fields is harmless, and you can do so if you need to override the default string type.

app/models/product.rb

```ruby
class Product < ApplicationItem
  fields :category, :price, :sku, :name # for clarity
  fields :sku # additional field that is not indexed, must set these explicitly
end
```

I also feel declaring all fields in the model adds clarity to the code. Schemaless databases can sometimes feel too loose. So fields auto-discovery may be removed in the future.
