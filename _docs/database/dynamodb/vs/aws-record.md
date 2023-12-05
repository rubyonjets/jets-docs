---
title: Dynomite Vs Aws Record
nav_text: Aws Record
category: dynamodb-vs
order: 2
---

[AWS::Record](https://github.com/aws/aws-sdk-ruby-record) is a data mapping abstraction over the AWS SDK for Ruby's client for Amazon DynamoDB written by AWS themselves. The pro to it is that it's written officially by AWS. However, it is a lightweight library. It has different goals. It focuses on lower-level things.

## Modeling

Aws::Record

```ruby
class MyModel
  include Aws::Record
  integer_attr :id, hash_key: true
  string_attr  :name, range_key: true
  boolean_attr :active, database_attribute_name: 'is_active_flag'
end
``
Dynomite:

```ruby
class User < ApplicationItem
  fields :name, :email, :rank
  field :role, default: "basic"
end
```

One difference is that AWS Record is included as a module `Aws::Record` whereas Dynomite classes inherit from `ApplicationItem`, which inherits from `Dynomite::Item`. This allows you to add common methods to the base abstract `ApplicationItem` class.

AWS Record is somewhat verbose syntactically. At of the time of this writing, it's [README](https://github.com/aws/aws-sdk-ruby-record/blob/1a82279283310159ce98646aef5bfafd6dbceab3/README.md) says under development and the interface may change.

## Migrations

Both have migration abilities.

Aws::Record

```ruby
cfg = Aws::Record::TableConfig.define do |t|
  t.model_class(MyModel)
  t.read_capacity_units(5)
  t.write_capacity_units(2)
end
cfg.migrate!
```

Dynomite:

```ruby
class CreatePosts < Dynomite::Migration
  def up
    update_table :posts do |t|
      t.partition_key :id
      t.add_gsi :title
      # t.provisioned_throughput(
      #   read_capacity_units: 5,
      #   write_capacity_units: 5
      # )
    end
  end
end
```

With Aws::Record, you need to call the code via a Rake task or something. You need to set it up for your own needs.

Dynomite has a CLI command to run the migrations.

    jets dynamodb:migrate

Importantly, it manages the ran migrations state and will only run the migration if it has not already been run in a `schema_migrations` table.

## Saving

Aws::Record

```ruby
item = MyModel.find(id: 1, name: 'Foo')
item.update(id: 1, name: 'Foo', age: 1)
```

Dynomite

```ruby
post = Post.new(title: "post 1")
post.save

post = Post.new
post.title = "post 2"
post.save

post = Post.new do |p|
  p.title = "post 3"
end
post.save
```

Believe Aws::Record saving notation seems is more lightweight. Validations were removed in [#17](https://github.com/aws/aws-sdk-ruby-record/pull/17) to reduce the scope of the library. So you do not get [Callbacks]({% link _docs/database/dynamodb/model/callbacks.md %}) and [Validations]({% link _docs/database/dynamodb/model/validations.md %}).

## Batch Operations

Aws::Record

```ruby
operation = Aws::Record::Batch.read do |db|
  db.find(Lunch, id: 1, name: 'Papaya Salad')
  db.find(Lunch, id: 2, name: 'BLT Sandwich')
  db.find(Dessert, id: 1, name: 'Apple Pie')
end

# BatchRead is enumerable and handles pagination
operation.each { |item| item.id }
```

Dynomite:

```ruby
Post.where(category: "cloud").each_page do |page|
  page.each do |post|
    # do something
  end
end
```

Since Dynomite returns a [Relation Lazy Enumerator]({% link _docs/database/dynamodb/querying/where.md %}), it can handle large data because items are only loaded as needed in [Pages]({% link _docs/database/dynamodb/other/paging.md %})

```ruby
Post.where(category: "cloud").each do |post|
  # do something
end
```

Interestingly, AWS is using [batch_get_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#batch_get_item-instance_method) and [batch_write_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#batch_write_item-instance_method) under the hood and is probably more optimal. Dynomite does not currently provide convenience wrapper methods for `batch_get_item` and `batch_write_item`. Note: We will review and consider PRs.

## Summary

It's hard to compare the two libraries because Aws::Record and Dynomite are pretty different in scope. Aws::Record is a lightweight layer. Dynomite is an ORM.