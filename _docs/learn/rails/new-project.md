---
title: New Rails Project
nav_text: New Project
search_title: New Rails Project
category: learn-rails
order: 1
---

{% include videos/learn/getting-started/rails.md %}

Let's `rails new` to generate a new Rails project.

    rails new demo --database mysql

We're using the `--database mysql` option for the mysql database adapter since we later deploy this to AWS Lambda.

    ❯ rails new demo --database mysql
          create
          create  README.md
          create  Rakefile
          create  .ruby-version
          create  config.ru
          create  .gitignore
          create  .gitattributes
          create  Gemfile
            run  git init from "."
          create  app
          ...
    ❯ mv demo rails
    ❯ cd rails

This gives us a starter Rails project.

## Scaffold

Let's use rails scaffolding to generate some code.

    ❯ cd rails
    ❯ rails generate scaffold post title:string body:text published:boolean

This gives us some basic CRUD actions.

## Root Route: Home Page

Let's also add a root route and point it to `posts#index`

config/routes.rb

```ruby
Rails.application.routes.draw do
  resources :posts
  get "up" => "rails/health#show", as: :rails_health_check
  root "posts#index" # <= ADD THIS
end
```

## DB Migration

Let's run the create the database and run the migration.

    rails db:create db:migrate

## Seeding Data

Let's create some seed data to help with first. Create this file:

db/seeds.rb

```ruby
2.times do |i|
  i += 1
  Post.find_or_create_by(title: "Post #{i}", body: "Body #{i}", published: true)
end
puts "Posts created"
```

Run `rails db:seed`

    ❯ rails db:seed
    Posts created

Run `rails runner` to confirm that the records were created.

    ❯ rails runner 'puts Post.count'
    2

