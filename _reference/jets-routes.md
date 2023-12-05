---
title: jets routes
reference: true
---

## Usage

    jets routes [options]

## Description

Print out your application routes

## Example

    $ jets routes
    +-------------------+--------+--------------------+--------------------+
    |    As (Prefix)    |  Verb  | Path (URI Pattern) | Controller#action  |
    +-------------------+--------+--------------------+--------------------+
    | posts             | GET    | /posts             | posts#index        |
    | posts             | POST   | /posts             | posts#create       |
    | new_post          | GET    | /posts/new         | posts#new          |
    | edit_post         | GET    | /posts/:id/edit    | posts#edit         |
    | post              | GET    | /posts/:id         | posts#show         |
    | post              | PUT    | /posts/:id         | posts#update       |
    | post              | PATCH  | /posts/:id         | posts#update       |
    | post              | DELETE | /posts/:id         | posts#destroy      |
    +-------------------+--------+--------------------+--------------------+


## Options

```
-c, [--controller=CONTROLLER]  # Filter by a specific controller, e.g. PostsController or Admin::PostsController
    [--format=FORMAT]          # Output formats: csv, equal, json, markdown, space, tab, table
                               # Default: table
-g, [--grep=GREP]              # Grep routes by a specific pattern
-r, [--reject=REJECT]          # Reject filter routes by a specific pattern
```

