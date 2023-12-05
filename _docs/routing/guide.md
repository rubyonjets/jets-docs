---
title: Routing Guide
category: routing
order: 1
---

{:.toc}
- [1. Introduction](#1-introduction)
- [2. Resources](#2-resources)
  * [2.1 only and except options](#21-only-and-except-options)
  * [2.2 resources options](#22-resources-options)
  * [2.3 param identifier](#23-param-identifier)
- [3. Named Routes Helper Methods](#3-named-routes-helper-methods)
  * [3.1 as option](#31-as-option)
  * [3.2 member and collection options](#32-member-and-collection-options)
  * [3.3 Named routes path and url helper](#33-named-routes-path-and-url-helper)
  * [3.4 Disable generated url helpers](#34-disable-generated-url-helpers)
- [4. Singular Resource](#4-singular-resource)
- [5. Nested Resources](#5-nested-resources)
- [6. Resource Members and Collections](#6-resource-members-and-collections)
- [7. Namespace](#7-namespace)
- [8. Path](#8-path)
- [9. Scope](#9-scope)
  * [9.1 prefix example](#91-prefix-example)
  * [9.2 as example](#92-as-example)
  * [9.3 module example](#93-module-example)
- [10. Mount Rack Apps](#10-mount-rack-apps)
- [11. Root](#11-root)

## 1. Introduction

Jets routing translates your `routes.rb` file into API Gateway resources and connects them to your Lambda functions. It also generates helper methods for URL paths for your convenience.

## 2. Resources

Jets routing leverages a REST architecture design by default.  A key component of a REST are resources. With HTTP, we can take actions like GET, POST, PUT, PATCH, DELETE on resources. Jets uses HTTP verbs and RESTful resources to achieve the common CRUD pattern: Create, Read, Update, and Delete.

With the `resources` method, Jets creates CRUD-related routes. Example:

config/routes.rb:

```ruby
resources :posts
````

Results in:

    +-------------+--------+--------------------+-------------------+
    | As (Prefix) |  Verb  | Path (URI Pattern) | Controller#action |
    +-------------+--------+--------------------+-------------------+
    | posts       | GET    | /posts             | posts#index       |
    | posts       | POST   | /posts             | posts#create      |
    | new_post    | GET    | /posts/new         | posts#new         |
    | edit_post   | GET    | /posts/:id/edit    | posts#edit        |
    | post        | GET    | /posts/:id         | posts#show        |
    | post        | PUT    | /posts/:id         | posts#update      |
    | post        | PATCH  | /posts/:id         | posts#update      |
    | post        | DELETE | /posts/:id         | posts#destroy     |
    +-------------+--------+--------------------+-------------------+

### 2.1 only and except options

You can use the `only` and `except` options with the `resources` method to select which routes you want to create.

Here's an example with `only`:

```ruby
resources :posts, only: %w[index show]
```

Results in:

    +-------------+------+--------------------+-------------------+
    | As (Prefix) | Verb | Path (URI Pattern) | Controller#action |
    +-------------+------+--------------------+-------------------+
    | posts       | GET  | /posts             | posts#index       |
    | post        | GET  | /posts/:id         | posts#show        |
    +-------------+------+--------------------+-------------------+

Here's an example with `except`:

```ruby
resources :posts, except: %w[new delete edit update]
```

Results in:

    +-------------+--------+--------------------+-------------------+
    | As (Prefix) |  Verb  | Path (URI Pattern) | Controller#action |
    +-------------+--------+--------------------+-------------------+
    | posts       | GET    | /posts             | posts#index       |
    | posts       | POST   | /posts             | posts#create      |
    | post        | GET    | /posts/:id         | posts#show        |
    | post        | DELETE | /posts/:id         | posts#destroy     |
    +-------------+--------+--------------------+-------------------+

### 2.2 resources options

Resources supports several options: module, prefix, as, controller.

* module: adds a module name to the controller
* path: adds a prefix to the path
* as: changes the name of the generated helper methods
* controller: changes controller that it maps to

**module example:**

```ruby
resources :posts, module: "admin"
```

Results in:

    +-------------+--------+--------------------+---------------------+
    | As (Prefix) |  Verb  | Path (URI Pattern) |  Controller#action  |
    +-------------+--------+--------------------+---------------------+
    | posts       | GET    | /posts             | admin/posts#index   |
    | posts       | POST   | /posts             | admin/posts#create  |
    | new_post    | GET    | /posts/new         | admin/posts#new     |
    | edit_post   | GET    | /posts/:id/edit    | admin/posts#edit    |
    | post        | GET    | /posts/:id         | admin/posts#show    |
    | post        | PUT    | /posts/:id         | admin/posts#update  |
    | post        | PATCH  | /posts/:id         | admin/posts#update  |
    | post        | DELETE | /posts/:id         | admin/posts#destroy |
    +-------------+--------+--------------------+---------------------+

**prefix example:**

```ruby
resources :posts, path: "v1"
```

Results in:

    +-------------+--------+--------------------+-------------------+
    | As (Prefix) |  Verb  | Path (URI Pattern) | Controller#action |
    +-------------+--------+--------------------+-------------------+
    | posts       | GET    | /v1                | posts#index       |
    | posts       | POST   | /v1                | posts#create      |
    | new_post    | GET    | /v1/new            | posts#new         |
    | edit_post   | GET    | /v1/:id/edit       | posts#edit        |
    | post        | GET    | /v1/:id            | posts#show        |
    | post        | PUT    | /v1/:id            | posts#update      |
    | post        | PATCH  | /v1/:id            | posts#update      |
    | post        | DELETE | /v1/:id            | posts#destroy     |
    +-------------+--------+--------------------+-------------------+

**as example:**

```ruby
resources :posts, as: "articles"
```

Results in:

    +--------------+--------+--------------------+-------------------+
    | As (Prefix)  |  Verb  | Path (URI Pattern) | Controller#action |
    +--------------+--------+--------------------+-------------------+
    | articles     | GET    | /posts             | posts#index       |
    | articles     | POST   | /posts             | posts#create      |
    | new_article  | GET    | /posts/new         | posts#new         |
    | edit_article | GET    | /posts/:id/edit    | posts#edit        |
    | article      | GET    | /posts/:id         | posts#show        |
    | article      | PUT    | /posts/:id         | posts#update      |
    | article      | PATCH  | /posts/:id         | posts#update      |
    | article      | DELETE | /posts/:id         | posts#destroy     |
    +--------------+--------+--------------------+-------------------+

**controller example:**

```ruby
resources :posts, controller: "articles"
```

Results in:

    +-------------+--------+--------------------+-------------------+
    | As (Prefix) |  Verb  | Path (URI Pattern) | Controller#action |
    +-------------+--------+--------------------+-------------------+
    | posts       | GET    | /posts             | articles#index    |
    | posts       | POST   | /posts             | articles#create   |
    | new_post    | GET    | /posts/new         | articles#new      |
    | edit_post   | GET    | /posts/:id/edit    | articles#edit     |
    | post        | GET    | /posts/:id         | articles#show     |
    | post        | PUT    | /posts/:id         | articles#update   |
    | post        | PATCH  | /posts/:id         | articles#update   |
    | post        | DELETE | /posts/:id         | articles#destroy  |
    +-------------+--------+--------------------+-------------------+

The options can be provided directly to `resources` method. You may also want to look at using the `scope`, `prefix` which can provide similar results with less duplication by making use of blocks.  The [scope](#9-scope) and [prefix](#8-prefix) docs are below.

### 2.3 param identifier

You can change the variable identifier in the path with the `param` option.  Example:

```ruby
resources :posts, param: :my_post_id
```

Results in:

    +-------------+--------+-------------------------+-------------------+
    | As (Prefix) |  Verb  |   Path (URI Pattern)    | Controller#action |
    +-------------+--------+-------------------------+-------------------+
    | posts       | GET    | /posts                  | posts#index       |
    | posts       | POST   | /posts                  | posts#create      |
    | new_post    | GET    | /posts/new              | posts#new         |
    | edit_post   | GET    | /posts/:my_post_id/edit | posts#edit        |
    | post        | GET    | /posts/:my_post_id      | posts#show        |
    | post        | PUT    | /posts/:my_post_id      | posts#update      |
    | post        | PATCH  | /posts/:my_post_id      | posts#update      |
    | post        | DELETE | /posts/:my_post_id      | posts#destroy     |
    +-------------+--------+-------------------------+-------------------+

Generally, it is recommended to **not** override the param identifier default.

## 3. Named Routes Helper Methods

Jets automatically generates named routes helper methods from your routes declarations.  Named route helpers are generated for these CRUD-related controller actions: index, new, edit, show.

The **As** column in the previous routes table shows the prefix of the named route helper name. They map to generated named routes helper methods:

As / Prefix | Helper
--- | ---
posts | posts_path
new_post | new_post_path
post | post_path(id)
edit_post | edit_post_path(id)

Named routes helper methods are also generated when you use the `as` option explicitly.

### 3.1 as option

```ruby
get "list", to: "posts#index", as: :list
get "hit", to: "posts#hit" # will not generate a named route helper
get "view/:id", to: "posts#view", as: "view"
```

Generates:

    +-------------+------+--------------------+-------------------+
    | As (Prefix) | Verb | Path (URI Pattern) | Controller#action |
    +-------------+------+--------------------+-------------------+
    | list        | GET  | /list              | posts#index       |
    | hit         | GET  | /hit               | posts#hit         |
    | view        | GET  | /view/:id          | posts#view        |
    +-------------+------+--------------------+-------------------+

Here are their named routes helper methods.

As / Prefix | Helper
--- | ---
list | list_path
hit  | hit_path
view | view_path(id)

### 3.2 member and collection options

Named routes helper methods are also generated when you use the `member` or `collection` keywords with your route.  Refer to the [members and collections docs](#6-resource-members-and-collections) below for examples.

### 3.3 Named routes path and url helper

For each `_path` method there is a corresponding `_url` method.  The `_url` method includes the host. Here's a table with examples:

As / Prefix | Path Helper | Url Helper
--- | --- | ---
posts | posts_path => /posts | posts_url => localhost:8888/posts
new_post | new_post_path => /posts/new | new_post_url => localhost:8888/posts/new
post | post_path(1) => /posts/1 | post_url(1) => localhost:8888/posts/1
edit_post | edit_post_path(1) => /posts/1/edit | edit_post_url(1) => localhost:8888/posts/1/edit

### 3.4 Disable generated url helpers

You can disable the generation of the url helper with `as: :disabled`. Example:

```ruby
get "posts", to: "posts#index", as: :disabled
```

You may want to do this if 2 generated url helpers happen to step on each other.

## 4. Singular Resource

There are sometimes resources that always look up the same id. A good example of this is a `profile` resource. The profile resource always looks up the currently logged-in user. We do not need to have the user id as a part of the url path. The singular `resource` method is useful here. Example:

```ruby
resource :profile
```

Results in:

    +--------------+--------+--------------------+-------------------+
    | As (Prefix)  |  Verb  | Path (URI Pattern) | Controller#action |
    +--------------+--------+--------------------+-------------------+
    | profile      | POST   | /profile           | profiles#create   |
    | new_profile  | GET    | /profile/new       | profiles#new      |
    | edit_profile | GET    | /profile/edit      | profiles#edit     |
    | profile      | GET    | /profile           | profiles#show     |
    | profile      | PUT    | /profile           | profiles#update   |
    | profile      | PATCH  | /profile           | profiles#update   |
    | profile      | DELETE | /profile           | profiles#destroy  |
    +--------------+--------+--------------------+-------------------+

Here are the generated named routes helpers:

As / Prefix | Helper
--- | ---
new_profile | new_profile_path
profile | profile_path
edit_profile | edit_profile_path

There are no arguments for any of the generated helper methods. They are not needed. Also notice, there is no index action route.

## 5. Nested Resources

Nesting resources are supported. Example:

```ruby
resources :posts do
  resources :comments
end
```

Results in:

    +-------------------+--------+-----------------------------------+-------------------+
    |    As (Prefix)    |  Verb  |        Path (URI Pattern)         | Controller#action |
    +-------------------+--------+-----------------------------------+-------------------+
    | posts             | GET    | /posts                            | posts#index       |
    | posts             | POST   | /posts                            | posts#create      |
    | new_post          | GET    | /posts/new                        | posts#new         |
    | edit_post         | GET    | /posts/:id/edit                   | posts#edit        |
    | post              | GET    | /posts/:id                        | posts#show        |
    | post              | PUT    | /posts/:id                        | posts#update      |
    | post              | PATCH  | /posts/:id                        | posts#update      |
    | post              | DELETE | /posts/:id                        | posts#destroy     |
    | post_comments     | GET    | /posts/:post_id/comments          | comments#index    |
    | post_comments     | POST   | /posts/:post_id/comments          | comments#create   |
    | new_post_comment  | GET    | /posts/:post_id/comments/new      | comments#new      |
    | edit_post_comment | GET    | /posts/:post_id/comments/:id/edit | comments#edit     |
    | post_comment      | GET    | /posts/:post_id/comments/:id      | comments#show     |
    | post_comment      | PUT    | /posts/:post_id/comments/:id      | comments#update   |
    | post_comment      | PATCH  | /posts/:post_id/comments/:id      | comments#update   |
    | post_comment      | DELETE | /posts/:post_id/comments/:id      | comments#destroy  |
    +-------------------+--------+-----------------------------------+-------------------+

This makes for nice clean URLs. For example, we can get all the comments that belong to a post with `/posts/1/comments`.

Here are the generated named routes helpers:

As / Prefix | Helper
--- | ---
posts | posts_path
new_post | new_post_path
post | post_path(post_id)
edit_post | edit_post_path(post_id)
post_comments | post_comments_path(post_id)
new_post_comment | new_post_comment_path(post_id)
post_comment | post_comment_path(post_id, id)
edit_post_comment | edit_post_comment_path(post_id, id)

Note: When resources are nested the parent path variable names all become `:post_id`.  This is because path variable siblings must all be the same for API Gateway. More details here: [API Gateway Considerations]({% link _docs/considerations/api-gateway.md %}).

## 6. Resource Members and Collections

Within the resources block you can use the `member` or `collection` options as a shorthand to create additional resource related routes.  Example:

```ruby
resources :posts, only: [] do
  get "preview", on: :member
  get "list", on: :collection
end
```

Generates:

    +--------------+------+--------------------+-------------------+
    | As (Prefix)  | Verb | Path (URI Pattern) | Controller#action |
    +--------------+------+--------------------+-------------------+
    | preview_post | GET  | /posts/:id/preview | posts#preview     |
    | list_posts   | GET  | /posts/list        | posts#list        |
    +--------------+------+--------------------+-------------------+

And their corresponding named routes helper methods.

As / Prefix | Helper
--- | ---
preview_post | preview_post_path(post_id)
list_posts | list_posts_path

If you have multiple routes to add, you can also use the block form of `member` or `resources`:

```ruby
resources :posts, only: [] do
  member do
    get "preview"
  end
  collection do
    get "list"
  end
end
```

Also results in:

    +--------------+------+--------------------+-------------------+
    | As (Prefix)  | Verb | Path (URI Pattern) | Controller#action |
    +--------------+------+--------------------+-------------------+
    | preview_post | GET  | /posts/:id/preview | posts#preview     |
    | list_posts   | GET  | /posts/list        | posts#list        |
    +--------------+------+--------------------+-------------------+

## 7. Namespace

Namespacing is also supported.  Unlike nested resources, namespaces do not manage or create any **resource**. For example, there's no `:admin_id` variable. Namespacing is useful for organizing code. Example:

```ruby
namespace :admin do
  resources :posts
end
```

Generates:

    +-----------------+--------+-----------------------+---------------------+
    |   As (Prefix)   |  Verb  |  Path (URI Pattern)   |  Controller#action  |
    +-----------------+--------+-----------------------+---------------------+
    | admin_posts     | GET    | /admin/posts          | admin/posts#index   |
    | admin_posts     | POST   | /admin/posts          | admin/posts#create  |
    | new_admin_post  | GET    | /admin/posts/new      | admin/posts#new     |
    | edit_admin_post | GET    | /admin/posts/:id/edit | admin/posts#edit    |
    | admin_post      | GET    | /admin/posts/:id      | admin/posts#show    |
    | admin_post      | PUT    | /admin/posts/:id      | admin/posts#update  |
    | admin_post      | PATCH  | /admin/posts/:id      | admin/posts#update  |
    | admin_post      | DELETE | /admin/posts/:id      | admin/posts#destroy |
    +-----------------+--------+-----------------------+---------------------+

Namespacing affects:

1. as helper method name: It adds an `admin` to the names.
2. path: The path gets an `admin` **prefix**
3. controller namespace: The controllers are within an `admin` module.

The `namespace` method uses a more general `scope` method. `namespace` is a `scope` declaration with the `as`, `prefix`, and `module` options set to the `namespace` value.

## 8. Path Prefix

If you only want to add a path prefix to your resources paths, the `path` method can be used. Example:

```ruby
path :admin do
  resources :posts
end
```

Results in:

    +-------------+--------+-----------------------+-------------------+
    | As (Prefix) |  Verb  |  Path (URI Pattern)   | Controller#action |
    +-------------+--------+-----------------------+-------------------+
    | posts       | GET    | /admin/posts          | posts#index       |
    | posts       | POST   | /admin/posts          | posts#create      |
    | new_post    | GET    | /admin/posts/new      | posts#new         |
    | edit_post   | GET    | /admin/posts/:id/edit | posts#edit        |
    | post        | GET    | /admin/posts/:id      | posts#show        |
    | post        | PUT    | /admin/posts/:id      | posts#update      |
    | post        | PATCH  | /admin/posts/:id      | posts#update      |
    | post        | DELETE | /admin/posts/:id      | posts#destroy     |
    +-------------+--------+-----------------------+-------------------+

## 9. Scope

Scope is the more general method in the routes DSL. You can use it to set the `as`, `prefix`, and `module`. Some examples to help explain:

### 9.1 path prefix example

```ruby
scope path: :admin do
  get "posts", to: "posts#index"
end
```

Results in:

    +-------------+------+--------------------+-------------------+
    | As (Prefix) | Verb | Path (URI Pattern) | Controller#action |
    +-------------+------+--------------------+-------------------+
    | posts       | GET  | /admin/posts       | posts#index       |
    +-------------+------+--------------------+-------------------+

Notice, only the path is affected.  You can also set the scope prefix with a string or symbol option. IE: `scope :admin`

### 9.2 as example

```ruby
scope(as: :admin) do
  get "posts/:id/edit", to: "posts#edit"
end
```

Results in:

    +-----------------+------+--------------------+-------------------+
    |   As (Prefix)   | Verb | Path (URI Pattern) | Controller#action |
    +-----------------+------+--------------------+-------------------+
    | edit_admin_post | GET  | /posts/:id/edit    | posts#edit        |
    +-----------------+------+--------------------+-------------------+

Only the generated helper method is affected.

### 9.3 module example

```ruby
scope(module: :admin) do
  get "posts", to: "posts#index"
end
```

Results in:

    +-------------+------+--------------------+-------------------+
    | As (Prefix) | Verb | Path (URI Pattern) | Controller#action |
    +-------------+------+--------------------+-------------------+
    | posts       | GET  | /posts             | admin/posts#index |
    +-------------+------+--------------------+-------------------+

Only the controller module is affected.

## 10. Mount Rack Apps

Jets supports mounting Rack applications. This allows you to run most Rack compatible on serverless with little effort. Example:

config/routes.rb

```ruby
Jets.application.routes.draw do
  mount RackApp, at: 'rack'  # app/racks/rack_app
end
```

More info: [Mount Rack Apps docs]({% link _docs/routing/mount.md %})

## 11. Root

You can specify the root or homepage path with the `root` method.

config/routes.rb

```ruby
Jets.application.routes.draw do
  root to: "articles#index"
end
```

You can also provide just a string to the `root` method:

```ruby
Jets.application.routes.draw do
  root "home#index"
end
```
