---
title: DynamoDB Dynomite Has Many
nav_text: Has Many
category: dynamodb-associations
order: 1
---

Example:

app/models/user.rb

```ruby
class User < ApplicationItem
  has_many :posts
end
```

There is typically a corresponding [belongs_to]({% link _docs/database/dynamodb/associations/belongs_to.md %}) as the inverse relationship.

app/models/post.rb

```ruby
class Post < ApplicationItem
  belongs_to :user
end
```

{% include database/dynamodb/associations/test-data-note.md %}

## Creating

```ruby
user = User.find("bob")
user.posts << Post.find("post-1")
user.posts << Post.find("post-2")
user.posts.map(&:id).sort # ["post-1","post-2"]
```

This will store the ids in the `users.posts_ids` field as a [String Set]({% link _docs/database/dynamodb/model/data-types.md %}) and in the `posts.user_id` field as a [String]({% link _docs/database/dynamodb/model/data-types.md %}).

```ruby
user.posts_ids # <Set: {"post-1", "post-2"}>
Post.find("post-1").user_id # "bob"
Post.find("post-2").user_id # "bob"
```

## Deleting

Deleting the posts with the association method will remove the "foreign keys" and **also** delete the Post records themselves.

```ruby
user.posts.delete_all
Post.find_by(id: "post-1") # nil
Post.find_by(id: "post-2") # nil
```

If you need to run the callbacks.

```ruby
user.posts.destroy_all
```

## Disassociating

If you want to disassociate the items without deleting them.

```ruby
user.posts.disassociate Post.find("post-1")
user.posts.disassociate Post.find("post-2")
Post.exists?("post-1") # true
Post.exists?("post-2") # true
```

You can also disassociate all items.

```ruby
user.posts.disassociate_all
```

You can also reassociate all items completely.

```ruby
user.posts = Post.find("post-1", "post-2")
```

## Querying

You can do some basic filtering with `has_many`. See: [Association Querying]({% link _docs/database/dynamodb/associations/querying.md %}).

## Association with Same Model

```ruby
class User < ApplicationItem
  has_many :students, class: User
  belongs_to :teacher, class_name: :user
  has_and_belongs_to_many :friends, inverse_of: :friending_users
end
```
