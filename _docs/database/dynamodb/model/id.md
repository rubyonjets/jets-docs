---
title: DynamoDB Dynomite Model Unique Id
nav_text: Unique Id
category: dynamodb-model
order: 2
---

By default, dynomite a unique id upon creating an item. This field is `id` and will have the underscore class name and random characters. Example:

class name | unique id example
---|---
Product | product-Q1xnDhRzIYduWAtU

The id makes it easy to find an item regardless of whether or not you're using Composite Keys.

```ruby
Product.find("product-Q1xnDhRzIYduWAtU")
```

Related: [find]({% link _docs/database/dynamodb/querying/find.md %})

## Migration id Index

It would help if you always had an index on the `id` field so it's quick to query for it. Example:

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key :category # required
      t.sort_key  "sku:number"  # optional. makes the primary key a composite key
      t.add_gsi :id
    end
  end
end
```

In the above example, we add a GSI index to the id field because the partition key is `category`. We cannot add an LSI index for the `id` field because LSI indexes must be Composite Keys by definition.

If you have the `id` as the partition key only:

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key "id" # required
    end
  end
end
```

Then you don't need an additional index for `id`, since the key_schema has the partition_key `id`, and it's already quick to look up with `get_item`. It's essentially already indexed.

I generally prefer creating tables with a Primary Key Partition Key. A Composite Key can be created with GSI indexes if needed. See: [Indexing]({% link _docs/database/dynamodb/indexing.md %}).

## Disable Magic Id

You can disable the setting of the magic `id` field by:

```ruby
class Post < ApplicationItem
  disable_id!
end
```

Note: This only turns off the setting of it. An `id` field accessor is still available to simplify the implementation.

It is strongly recommended not to disable the `id` field. Without the `id` field some dynomite features may not work, like [Associations]({% link _docs/database/dynamodb/associations.md %}). If you have a very good reason, we're interested to know.

