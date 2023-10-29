---
title: DynamoDB Dynomite Deleting
nav_text: Deleting
category: dynamodb
order: 6
---

## Destroy

Will run callbacks:

```ruby
post = Post.find_by(title: 'post 1')
post.destroy
```

## Delete

Will bypass callbacks:

```ruby
post = Post.find_by(title: 'post 1')
post.delete
```

## Batch Deleting

The `delete_all` deletes without running callbacks and also uses [batch_write_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#batch_write_item-instance_method) to delete faster.

```ruby
Post.delete_all
```

You can scope it with normal relation querying.

```ruby
Post.where(title: "post 1").delete_all
Post.limit(2).delete_all
```

You can also use `delete_by` to do the same thing:

```ruby
Post.delete_by(title: "post 1")
Post.limit(2).delete_by(title: "post 1")
```

## Batch Destroying

There are also the corresponding `destroy_all` and `destroy_by` methods, which will run callbacks.


```ruby
Post.destroy_all
Post.destroy_by(title: "post 1")
```
