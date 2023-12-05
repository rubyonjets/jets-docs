---
title: Jets Custom Jbuilder Renderer
nav_text: Jbuilder
category: howtos-renderers
order: 3
---

Here's a cheatsheet that shows how to set up a jbuilder renderer.  Note, with Jets this is not included by default.

## Gemfile

Adding the `jbuilder-jets` gem is enough to register the template handler.

Gemfile

```ruby
gem "jbuilder-jets"
```

## Use in View

We'll cover the `posts#index` action view.

app/views/posts/index.json.jbuilder

```ruby
json.array! @posts, partial: "posts/post", as: :post
```

app/views/posts/_post.json.jbuilder

```ruby
json.extract! post, :id, :title, :body, :published, :created_at, :updated_at
json.url post_url(post, format: :json)
```

Notice how you can use helpers like `post_url`.

## Controller

app/controllers/posts_controller.rb

```ruby
class PostsController < ApplicationController
  def index
    @posts = Post.all.limit(2)
  end
end
```

## Routes

config/routes.rb

```ruby
Jets.application.routes.draw do
  resources :posts
end
```
