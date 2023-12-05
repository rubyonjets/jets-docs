---
title: DynamoDB Dynomite Querying PartiQL SQL Like Support
nav_text: PartiQL
category: dynamodb-querying
order: 10
---

AWS Docs:

* [PartiQL select statements for DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ql-reference.select.html)
* [Run a PartiQL statement on a DynamoDB table using an AWS SDK](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/example_dynamodb_ExecuteStatement_section.html)

## Examples

### find_by_pql

The `find_by_pql` returns a Lazy Enumerator with model objects, IE: `Post`, `Product`, etc.

```ruby
Product.execute_pql('SELECT * FROM "demo-dev_products" WHERE name = ?', ['Laptop'])
Product.find_by_pql('name = ?', ['Laptop'])
```

The items are loaded as needed when Enumerator methods like `.each` are called. You can also force load all items with `.force` or `.to_a`.

Also, notice how the lower-level `execute_pql` method requires you to specify the full namespaced table name. The convenience wrapper methods like `find_by_pql` infer the information.

### select_all

The `select_all` returns Ruby Hashes.

```ruby
Product.execute_pql('SELECT * FROM "demo-dev_products" WHERE name = ?', ['Laptop'])
Product.select_all('name = ?', ['Laptop'])
```

### update_pql

```ruby
post = Post.first
Post.execute_pql('UPDATE "demo-dev_posts" SET title = ? WHERE id = ?', ['post 1b', post.id])
Post.update_pql('SET title = ? WHERE id = ?', ['post 1c', post.id])
```

### delete_pql

```ruby
post = Post.first
Post.execute_pql('DELETE FROM "demo-dev_posts" WHERE id = ?', [post.id])
Post.delete_pql('id = ?', [post.id])
```

### insert_pql

```ruby
Post.execute_pql(%Q|INSERT INTO "demo-dev_posts" VALUE {'id': ?, 'title': ?}|, ['post-1', 'post 1'])
Post.insert_pql("{'id': ?, 'title': ?}", ['post-3', 'post 3'])
```

## Notation Limits

PartiQL currently does not support using hardcoded values. Also, placeholder notation is not supported. Examples:

```ruby
Product.find_by_pql('name = ?', ['Laptop'])         # works
Product.find_by_pql('name = "Laptop"')              # does not work
Product.find_by_pql('name = :name', name: "Laptop") # does not work
```

This is because Dynomite uses the AWS DynamoDB SDK [execute_statement](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#execute_statement-instance_method), and it does not support that syntax. Dynomite can probably add support for it by modifying the expression before passing the parameters to the SDK. Still, it's not worth the effort because the underlying AWS DynamoDB SDK may add support one day.
