---
title: DynamoDB Dynomite Has And Belongs To Many
nav_text: HABTM
category: dynamodb-associations
order: 4
---

Example:

app/models/user.rb

```ruby
class User < ApplicationItem
  has_and_belongs_to_many :groups
end
```

There is should be corresponding [has_and_belongs_to_many]({% link _docs/database/dynamodb/associations/has_and_belongs_to_many.md %}) as the inverse relationship.

app/models/group.rb

```ruby
class Group < ApplicationItem
  belongs_to :user
end
```

{% include database/dynamodb/associations/test-data-note.md %}

## Creating

```ruby
bob = User.find("bob")
bob.groups << Group.find("group-red")
bob.groups << Group.find("group-green")
kevin = User.find("kevin")
kevin.groups << Group.find("group-red")
```

This will store the ids in the `users.group_ids` and `groups.user_ids` fields as [String Set]({% link _docs/database/dynamodb/model/data-types.md %}) types.

If you're coming from the relational database world, you might be thinking, where's the join table? There is no join table. Each of the join columns are added to the existing tables. This corresponds more with how key-value schemaless databases like DynamoDB work.

## Deleting

Deleting the posts with the association method will remove the "foreign keys" and **also** delete the Group records themselves.

```ruby
bob = User.find("bob")
bob.groups.delete_all
Group.exists?("group-red")   # false
Group.exists?("group-green") # false
kevin = User.find("kevin")
kevin.groups # [] # group-red has been removed also
```

If you need to run callbacks.

```ruby
bob.group.destroy_all
```

## Disassociating

If you want to disassociate the items without deleting them.

```ruby
red = Group.find("group-red")
green = Group.find("group-green")
bob.groups.disassociate(red, green)
bob.groups.include?(red)   # false
bob.groups.include?(green) # false
```

You can also disassociate all items.

```ruby
bob.groups.disassociate_all
```

You can also reassociate all items completely.

```ruby
bob.groups = Group.find("group-yellow", "group-blue")
```

## Querying

You can do some basic filtering with `has_and_belongs_to_many`. See: [Association Querying]({% link _docs/database/dynamodb/associations/querying.md %}).
