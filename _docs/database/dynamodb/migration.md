---
title: DynamoDB Dynomite Migrations
nav_text: Migrations
category: dynamodb
subcategory: migration
order: 3
---

## Generating Migrations

Dynomite can generate migration files used to create DynamoDB tables. Example:

    jets dynamodb:generate create_posts # generates migration
    jets dynamodb:migrate               # run migrations

The table name will have a namespace. For example, if your project is called `demo`, the `JETS_ENV=development`, and you create a table called `posts`. The DynamoDB full table name will be `demo-dev-posts`. You can change this behavior by adjusting the table `namespace` value. See: [Config]({% link _docs/database/dynamodb/config.md %}).

## Migration Example

You can use `dynamodb:generate` to create a starter migration file.

    ❯ jets dynamodb:generate create_posts
    Migration file created: dynamodb/migrate/20230728152326-create_posts.rb

dynamodb/migrate/20230728152326-create_posts.rb

```ruby
class CreatePosts < Dynomite::Migration
  def up
    create_table :posts do |t|
      t.partition_key :id # post-A2uxLhRzIYdqWwtN
      # Creating GSI with create_table now is much faster than using update_table later.
      # 20s vs 5m to 10m
      t.add_gsi :updated_at
    end
  end
end
```

More Examples:

{% assign docs = site.docs | where: "categories","migration" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}


## Migration Types

DynamoDB tables support certain types of attribute types. The CLI will parse the `--partition-key` option and use the second part to map it to the underlying DynamoDB type. For example, `--partition-key id:string`  maps `string` to `S`.

The migration types map to the [DynamoDB Types]({% link _docs/database/dynamodb/model/data-types.md %}). Here's a snippet of from the source with the types map.

```ruby
ATTRIBUTE_MAP = {
  string: 'S',
  number: 'N',
  binary: 'B',
  boolean: 'BOOL',
  null: 'NULL',
  map: 'M',
  list: 'L',
  string_set: 'SS',
  number_set: 'NS',
  binary_set: 'BS',
}
```

If a key is not in the map, it is passed through. So both `id:string` and `id:S` work. More info on DynamoDB types is available at the ruby aws-sdk docs: [Aws::DynamoDB::Types::AttributeDefinition](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Types/AttributeDefinition.html)

```ruby
class CreatePosts < Dynomite::Migration
  def up
    create_table :posts do |t|
      t.partition_key "id:S" # same as "id:string"
    end
  end
end
```

Here's the source code: [migration/dsl/types.rb](https://github.com/boltops-tools/dynomite/blob/master/lib/dynomite/migration/dsl/types.rb)
