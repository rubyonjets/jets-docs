---
title: DynamoDB Dynomite Seed Data
nav_text: Seed
category: migration
order: 5
---

You can seed data with

    jets dynamodb:seed

It'll load the Jets environment and load the `dynamodb/seeds.rb` file. Here's an example:

dynamodb/seeds.rb

```ruby
Post.find_or_create_by!(title: "post 1")
Post.find_or_create_by!(title: "post 2")
Post.find_or_create_by!(title: "post 3")
puts "posts created"
```
