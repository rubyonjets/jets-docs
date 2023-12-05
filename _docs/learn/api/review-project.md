---
title: Review Project
search_title: Review Project API
category: learn-api
order: 4
---

Let's explore the project code and write some app code.

## ApplicationController

The starter project comes with an `ApplicationController`. It looks like this:

app/controllers/application_controller.rb

```ruby
class ApplicationController < Jets::Controller::Base
end
```

In general, all of your controllers will inherit from this `ApplicationController`.

## Create a API

Let's create some code for an API. We'll generate some starter code again.

    ❯ jets generate scaffold post title:string body:text published:boolean
          invoke  active_record
          create    db/migrate/20231028045457_create_posts.rb
          create    app/models/post.rb
          invoke  resource_route
          route    resources :posts
          invoke  scaffold_controller
          create    app/controllers/posts_controller.rb
          invoke    resource_route

The generate code looks something like this:

app/controllers/posts_controller.rb

```ruby
class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
    render json: {deleted: true}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body, :published)
    end
end
```

It's a controller with the basic CRUD methods. Jets will create one lambda function to handle requests for any of the controller methods.

Next, we'll test the API locally.