---
title: DynamoDB Dynomite Optimistic Locking
nav_text: Locking
category: dynamodb-saving
order: 4
---

Dynomite makes it easy to use optimistic locking when you save data. Just add `enable_locking` or `enable_locking` to your model.

```ruby
class Post < ApplicationItem
  enable_locking
end
```

Optimistic locking works with the `lock_version` field by default. Dynomite uses it to check if someone else has changed the record since it was opened. If that happens, it throws the error `Dynomite::Error::StaleObject`.

```
post1 = Post.first
post2 = Post.first

post1.title = "post 1 edit 1"
post1.save

post2.title = "post 1 edit 2"
post2.save # Raises a Dynomite::Error::StaleObject
```

It's up to you to handle the conflict, usually by rescuing the exception and implementing business logic to sort it out.

## Locking Field

You can change the locking version field by specifying it as an argument.

```ruby
class Post < ApplicationItem
  enable_locking :optimistic_lock_version
end
```

Then

```ruby
post = Post.create(title: "test")
post.optimistic_lock_version # 1
```

The methods `enable_locking`, `enable_optimistic_locking`, `locking_field` are aliases. So this also works:

```ruby
class Post < ApplicationItem
  locking_field :optimistic_lock_version
end
```

## Locking Field Migration

The lock field should be an integer. So if you're adding an index via a migration, make sure you're adding it as a number.

```ruby
class CreateProducts < Dynomite::Migration
  def up
    create_table :posts do |t|
      t.add_gsi "lock_version:number"
    end
  end
end
```

## Related Docs

* [Rails ActiveRecord: Locking Records for Update](https://guides.rubyonrails.org/active_record_querying.html#locking-records-for-update)
* [AWS Condition Expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html)
