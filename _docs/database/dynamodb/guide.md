---
title: Dynomite DynamoDB Getting Started Learn Guide
nav_text: Guide
category: dynamodb
order: 1
---

This learn guide shows you how to get started with Dynomite and Dynamodb.

**Important**: Dynomite v2 requires Jets v5 and above.

The source code for this guide is available at: [rubyonjets/demo-dynomite](https://github.com/rubyonjets/demo-dynomite).

## New Project

First, generate a new project.

    jets new demo
    cd demo

## Install Gem

We'll add the dynomite gem to the `Gemfile`

    bundle add dynomite

## Scaffold

Let's generate a posts scaffold.

    jets generate scaffold post title:string body:text published:boolean

Note, we're using (abusing) the scaffold generator for ActiveRecord models. Since Dynomite is ActiveModel compatible, it'll work with only a few slight adjustments. This one of the beautiful things about dynomite v2 being ActiveModel compatible. Let's make those adjustments next.

## Item Modeling

If you do not yet have an `ApplicationItem` base model, you can generate one.

    ❯ jets generate application_item
        create  app/models/application_item.rb

Now update the `Post` class so it's an `ApplicationItem` instead of an `ApplicationRecord`.

app/models/posts.rb

```ruby
class Post < ApplicationItem
  field :title
  field :body
  field :published, type: :boolean
end
```

Since DynamoDB is a key-value store database, we can define the schema much more dynamically. Essentially, on-the-fly with the model definition.

## Migration

We still want to use migration files to manage and create new tables programmatically in a controlled manner instead of manually creating the tables and increasing the chances of ending with inconsistency between development vs. production.

Note, we do not need to use the ActiveRecord migration files that was generated as part of the scaffolding, so remove that.

    rm -f db/migrate/*_create_posts.rb

Now, we'll generate the dynamodb migration files.

    jets dynamodb:generate create_posts --partition-key id

Dynomite migrations work similarly to ActiveRecord migrations with a DSL. Let's run the migrations.

    jets dynamodb:migrate

This will create a namespaced table called `demo-dev_posts` and a `demo-dev_schema_migrations` table to track migrations statuses.

## Finish

At this point, you should have a working Jets application with posts wired to a DynamoDB storage backend.

## Removing ActiveRecord

If you do not need ActiveRecord at all, you can remove the mysql2 or whatever database adapter you have in your Gemfile. You can also remove these files:

    config/database.yml
    app/models/application_record.rb

Note: Do not remove it until the end because the scaffold relies on ActiveRecord.
