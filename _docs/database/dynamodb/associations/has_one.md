---
title: DynamoDB Dynomite Has One
nav_text: Has One
category: dynamodb-associations
order: 3
---

Example:

app/models/user.rb

```ruby
class User < ApplicationItem
  has_one :profile
end
```

There is typically a corresponding [belongs_to]({% link _docs/database/dynamodb/associations/belongs_to.md %}) as the inverse relationship.

app/models/profile.rb

```ruby
class Profile < ApplicationItem
  belongs_to :user
end
```

{% include database/dynamodb/associations/test-data-note.md %}

## Creating

```ruby
user = User.find("bob")
user.profile = Profile.find("profile-bob")
user.profile.id # profile-bob
# The inverse relationship is created
Profile.find("profile-bob").user.id # bob
```

This will store the ids in the `users.profile_id` and `profiles.user_id` fields as [String]({% link _docs/database/dynamodb/model/data-types.md %}) types.

## Deleting

There's no delete method on a single association like `has_one`. This is because the `user.profile` returns a Profile model instance. If you delete the like so:

```ruby
user = User.find("bob")
user.profile.delete # you're deleting the Profile!
```

Instead, you disassociate by assigning the `has_one` relationship to `nil`.

## Disassocating

```ruby
user = User.find("bob")
user.profile = nil
```

This will disassociate both sides of the relationship if both have been set up.

```ruby
user.profile # nil
profile = Profile.find("profile-bob")
profile.user # nil
```
