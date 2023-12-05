---
title: Dynomite Vs Dynamoid
nav_text: Dynamoid
category: dynamodb-vs
order: 1
---

[Dynamoid](https://github.com/Dynamoid/Dynamoid) is an ORM for Amazon's DynamoDB for Ruby applications. Dynomite is similar to it and draws some of its inspiration from it.

## Modeling

Dynamoid:

```ruby
class User
  include Dynamoid::Document
  field :name
  field :email
  field :rank, :integer
  field :role, default: "basic"
end
```

Dynomite:

```ruby
class User < ApplicationItem
  fields :name, :email, :rank
  field :role, default: "basic"
end
```

Both are [ActiveModel compatible]({% link _docs/database/dynamodb/model/activemodel.md %}). So you get thigs ActiveRecord-like [Validations]({% link _docs/database/dynamodb/model/validations.md %}) and [Callbacks]({% link _docs/database/dynamodb/model/callbacks.md %}) for free.

One difference is that Dynamoid is included as a module `Dynamoid::Document` whereas Dynomite classes inherit from `ApplicationItem`, which inherits from `Dynomite::Item`. This allows you to add common methods to the base abstract `ApplicationItem` class.

## Querying

Here's a cheatsheet to help compare the 2 ORMs querying abilities.

Dynamoid:

```ruby
Address.find(address.id)
Address.where(city: 'Chicago').all
Address.find_by_city('Chicago')

Address.where('postcode.null': true)
Address.where('postcode.not_null': true)
Address.where('postcode': nil)
Address.where('postcode.ne': nil)

Address.record_limit(5).start(address)
Address.scan_limit(5).start(address)

# Do some maintenance on the entire table without flooding DynamoDB
Address.batch(100).each { |addr| addr.do_some_work && sleep(0.01) }
Address.record_limit(10_000).batch(100).each { |addr| addr.do_some_work && sleep(0.01) } # Batch specified as part of a chain

Address.find(address.id, consistent_read: true)  # Find an address and ensure the read is consistent.
Address.where(city: 'Chicago').consistent.all    # Find all addresses where the city is Chicago, with a consistent read.

User.where("created_at.gt": DateTime.now - 1.day).all
User.where("created_at.lt": DateTime.now - 1.day).all
```

Dynomite:

```ruby
Post.find(post.id)
Post.find(id: post.id)
Product.find(category: "Electronics", sku: 101)

Product.find_by(category: "Electronics", sku: 101)
Product.find_by(category: "Electronics", sku: 101, name: "Smartphone", price: 500, stock_quantity: 50)

# no need for a batch command since it returns a Lazy Enumerator
Product.all.each { |product| do_some_work_with(product) }
Product.each_page { |page| page.each |product| do_some_work_with(product) } }

Product.where(name: "Smartphone", price: 500).index_name("price").count # specific index
Product.where(category: "Electronics").consistent.limit(2).map(&:name) # limit

Product.where("price.gte": 5)
Product.where("created_at.lt": 1.hour.ago)

Product.attribute_exists('pictures.slide_view')
Product.attribute_not_exists('pictures.slide_view')
Product.attribute_type('pictures.slide_view', :string)
Product.begins_with("category", "Elect") # works for String
Product.contains("tags", "foo") # works for String, Set and List

Product.where(category: "Electronics").and.where.not("price.lt": 1000)
Product.where(name: "Smartphone").or(name: "Laptop")
```

Both libraries have several ways to query. The comparison syntax is similar. A key difference is that Dynomite uses `key_condition_expression`, and Dynamoid uses the AWS legacy `key_conditions`. A few additional querying expressions like `or` is supported by Dynomite.

Learn more: [Dynomite Querying Expressions]({% link _docs/database/dynamodb/querying/expressions.md %}).

## Relationships

Both support [Associations]({% link _docs/database/dynamodb/associations.md %}).

Dynamoid:

```ruby
class User
  include Dynamoid::Document
  has_many :posts
  belongs_to :team
  has_one :profile
  has_and_belongs_to_many :groups
end
```

Dynomite:

```ruby
class User < ApplicationItem
  has_many :posts
  belongs_to :team
  has_one :profile
  has_and_belongs_to_many :groups
end
```

The syntaxes are very similar. Both will store the relationship info as `Sets` in "foreign key" fields. Dynomite will use singular names for singular relationships like `team_id` and plural names for plural relationships like `posts_id`. Dynomite uses pluralized names for all associations: `team_ids` and `posts_ids`.

There are some limits to relationships for both due to how DynamoDB works. It's covered in [Relationships Limits]({% link _docs/database/dynamodb/associations.md %}#relationships-limits).

## Migrations

Dynomite has the concept of migrations. Dynamoid does not. This is one of the design differences between the 2 ORMs.

With Dynamoid, you can create tables in two ways: 1. On-the-fly when data is first written via the model, and 2. A rake task.

If you start up a console and run a command that writes, the table is created right then and there.

    $ jets console
    > User.create(name: "tung) # will create the users table also

The LSI, GSI, and capacity settings, like `read_capacity`, are created as part of that.

The other way you can create the tables is with a rake task. Note that Rails automatically has this task via Rails Engines. With Jets, you need to load in your `Rakefile` with `load "dynamoid/tasks/database.rake"`

    rake dynamoid:create_tables

The rake tasks loop through all the defined model classes to determine which tables to create. Tables are created with table settings like GSIs initially but not synced afterward. Afterward, you can create the indexes with the API or console: [443](https://github.com/Dynamoid/dynamoid/issues/443), [263](https://github.com/Dynamoid/dynamoid/issues/263). You add an index and adjust your model code to match the index. If you follow the conventional naming of the index, it helps Dynamoid to use the index. Something like this:

Dynamoid:

```ruby
class User
  include Dynamoid::Document
  # The table settings like the partition key can also be specified in the model.
  # table key: :user_id, read_capacity: 5, write_capacity: 5
  field :name
  range :posted_at, :datetime
  global_secondary_index hash_key: :age # Must come after field definitions.
end
```

Like Dynamoid, with Dynomite, you can modify table settings with the DynamoDB AWS console. Dynomite auto-discovers the table index information and uses the indexes available without any need to declare it the model at all.

You can also create migration files to create GSIs. Example:

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

To run the migrations

    jets dynamodb:migrate

Migrations allow you to test on a dev account and then roll out to production systematically.

## Single Table Inheritance

Both support [STI]({% link _docs/database/dynamodb/associations/sti.md %}).

Dynamoid:

```ruby
class User
  include Dynamoid::Document
  field :kind
end
```

Dynomite:

```ruby
class Vehicle < ApplicationItem
  enable_sti
end
```

## Conclusions

Dynomite and Dynamoid are both ORMs for DynamoDB. They both have many features. Dynomite takes different design approaches with an `ApplicationItem` class, querying, relationships, and migrations. We only covered a few. Ultimately, you probably have to experiment with each to determine what's right for you.
