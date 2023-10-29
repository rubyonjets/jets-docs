---
title: Pagination
category: howtos
order: 1
---

The following instructions show how to add pagination in a cheatsheet-like summary.

We'll use a fork of [tongueroo/kaminari](https://github.com/tongueroo/kaminari).  There are only a few changes to kaminari required add Jets support. Here's the [diff](https://github.com/kaminari/kaminari/compare/master...tongueroo:kaminari:master).


## Project

Create new project

    jets new demo
    jets generate scaffold post title:string body:text published:boolean

Create a seeds.rb file to create a lot of records.

db/seeds.rb

```ruby
50.times do |i|
  n = i + 1
  Post.find_or_create_by(title: "Title #{n}", body: "Body #{n}")
end
```

Seed the data

    jets db:seed

This is enough to test pagination.

## Add Pagination

Add to your Gemfile

Gemfile

```ruby
gem 'kaminari', github: 'tongueroo/kaminari', branch: 'master'
```

You can generate a starter kaminari_config.rb

    ❯ bundle exec jets generate kaminari:config
        create  config/initializers/kaminari_config.rb

## Controller

app/controllers/posts_controller.rb

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.order(:title).page params[:page]
  end
```

## Views

app/views/posts/index.html.erb

```html
<%= paginate @posts %>
```

This would output several pagination links such as:

`« First ‹ Prev ... 2 3 4 5 6 7 8 9 10 ... Next › Last »`

You should be able to go through the pages with links like so:

* [http://localhost:8888/posts](http://localhost:8888/posts)
* [http://localhost:8888/posts?page=2](http://localhost:8888/posts?page=2)

For more details original docs: [tongueroo/kaminari](https://github.com/tongueroo/kaminari)
