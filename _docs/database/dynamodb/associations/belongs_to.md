---
title: DynamoDB Dynomite Belongs To
nav_text: Belongs To
category: dynamodb-associations
order: 2
---

Example:

app/models/post.rb

```ruby
class Post < ApplicationItem
  belongs_to :user
end
```

There is typically a corresponding [has_many]({% link _docs/database/dynamodb/associations/has_many.md %}) as the inverse relationship.

app/models/user.rb

```ruby
class User < ApplicationItem
  has_many :posts
end
```

## Creating

```ruby
user = User.find("bob")
Post.find("post-1").user = user
Post.find("post-2").user = user
```

This will store the ids in the `users.posts_ids` field as a [String Set]({% link _docs/database/dynamodb/model/data-types.md %}) and in the `posts.user_id` field as a [String]({% link _docs/database/dynamodb/model/data-types.md %}).

```ruby
user.posts_ids # <Set: {"post-1"}>
Post.find("post-1").user_id # "bob"
Post.find("post-2").user_id # "bob"
```

## Deleting

There's no delete method on a single association like `belongs_to`. This is because the `post.user` returns a User model instance. If you delete the like so:

```ruby
post = Post.find("post-1")
post.user.delete # you're deleting the User!
```

Instead, you disassociate by assigning the `belongs_to` relationship to `nil`.

## Disassocating

```ruby
Post.find("post-1").user = nil
Post.find("post-2").user = nil
```

This will disassociate both sides of the relationship if both have been set up.

```ruby
Post.find("post-1").user    # nil
Post.find("post-2").user    # nil
User.find("bob").posts_ids  # nil
```
