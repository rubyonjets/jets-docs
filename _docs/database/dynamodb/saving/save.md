---
title: DynamoDB Dynomite Save
nav_text: Save
category: dynamodb-saving
order: 1
---

## Examples

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

## Updates Based on Primary Key

An item is always saved based on the "primary key". The primary key is used to determine unique records. As covered in [Indexing]({% link _docs/database/dynamodb/indexing.md %}) also.

{% include database/dynamodb/primary-key.md %}

Underneath the hood, the `save` class method calls [put_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#put_item-instance_method) with the primary key attributes for uniqueness. This means two calls to `save` with the same primary key will update the record. The full primary key identifies uniqueness. This is the way DynamoDB works.

Let's say the Primary Key is a Composite Key with attributes `partition_key: category` and `sort_key: sku`. Then changing any keys with the underlying `put_item` would try to create a **new** additional item.

Dynomite throws an error to prevent this quirky behavior.

    product = Product.find_by(category: "Electronics", sku: 102)
    product.category = "Computers"
    product.save # ERRORS
    => Cannot change the primary key of an existing record: ["category"] (Dynomite::Error::PrimaryKeyChangedError)

You cannot change any of the primary keys. You should instead create a new item and delete the old one. This is one of the reasons I prefer a single Primary Key Partition Key. It's a little too easy to think of these keys as field attributes and treat them like you can change them when you cannot.

## Saving With Correct Data Type for Partition and Sort Key

Generally, you can save any arbitrary type. However, you must provide matching types for the `partition_key` and `sort_key` types. We'll explain with an example:

dynamodb/migrate/20230728152326-create_products.rb

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :products do |t|
      t.partition_key "category:string" # required
      t.sort_key "sku:number"           # optional
    end
  end
end
```

Since the sort_key is a `number`. You'll get an error if you try to save a String value. Notice the `102.to_s`.

    ❯ jets console
    > Product.create(category: "Electronics", sku: 102.to_s, name: "Laptop", price: 1000, stock_quantity: 20)
    .../gems/aws-sdk-core-3.180.0/lib/seahorse/client/plugins/raise_response_errors.rb:17:in `call':
    One or more parameter values were invalid: Type mismatch for key sku expected: N actual: S
    (Aws::DynamoDB::Errors::ValidationException)
    ...
    >

Saving it with the correct data type works.

    > Product.create(category: "Electronics", sku: 102, name: "Laptop", price: 1000, stock_quantity: 20)
    =>
    #<Product:0x00007fcac2455148
    @attrs=
      {"category"=>"Electronics",
      "sku"=>102,
      "name"=>"Laptop",
      "price"=>1000,
      "stock_quantity"=>20,
      "id"=>"b6fbcbcc47c1d404126dddd4e026c8c6c55f4e14",
      "created_at"=>"2023-07-28T22:14:05Z",
      "updated_at"=>"2023-07-28T22:14:05Z"},
    @errors=#<ActiveModel::Errors []>,
    @new_record=false,
    @validation_context=nil>
    >
