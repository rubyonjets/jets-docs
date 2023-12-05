---
title: DynamoDB Dynomite Associations Querying
nav_text: Querying
category: dynamodb-associations
order: 5
---

The `has_many` and `has_and_belongs_to_many` associations return a simple Ruby Enumerable. Dynomite loads all the items into an Array, and you can apply basic filtering using Ruby. IE: `select`, `reject`, `each`, etc.

## Basic Association where

There is a simple `where` method for the association results also. You can use it to do simple match filtering. Example:

```ruby
user.posts.where(title: "post 1")
user.posts.select { |p| p.title == "post 1" } # basic Ruby
```

It is not the same as the `Relation` Enumerable returned by the dynomite query interface: [Dynomite Querying]({% link _docs/database/dynamodb/querying.md %}). It's more lightweight and does filtering purely in Ruby.

## Direct Access To Relation Query Interface

Interestingly, you can also grab a corresponding Query Relation object from the association. Here's how it works:

```ruby
user.posts.relation.where(title: "post 1")
```

The `.relation` method returns a Lazy Enumerable Relation. You can chain any of the [Dynomite Querying Interface Methods and Expressions]({% link _docs/database/dynamodb/querying/expressions.md %}).

```ruby
relation = user.posts.relation
relation.where(title: "post 1").and.not(category: "ruby").and("updated_at.gt": 10.days.ago)
```

Note: The relation will always be a slow `scan` because it uses the `id.in` operator to scope `posts_ids` for the associated items.
