---
title: DynamoDB Dynomite Associations Test Data
nav_text: Test Data
category: dynamodb-associations
order: 88
---

Test data for explaining associations. Notably, friendly ids are set.

dynamodb/seeds.rb

```ruby
9.times do |i|
  n = i+1
  Post.find_or_create_by!(id: "post-#{n}", category: "ruby", title: "post #{n}", body: "body #{n}")
  nil
end
puts "posts created"

%w[tung bob kevin stuart].each do |name|
  User.find_or_create_by!(id: name, name: name, email: "#{name}@example.com")
  Profile.find_or_create_by!(id: name, bio: name)
end
puts "users created"
```

## Migration Used to Create Table

```ruby
class CreatePosts < Dynomite::Migration
  def up
    create_table :posts do |t|
      t.partition_key :id
      t.add_gsi :title
    end
  end
end
```
