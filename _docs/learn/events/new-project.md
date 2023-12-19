---
title: New Project
search_title: New Project Events
category: learn-events
order: 1
---

We'll create a project from scratch.

    mkdir events
    cd events

Let's create the Gemfile for dependencies.

Gemfile

```ruby
source "https://rubygems.org"

gem "jets", ">= 6.0"
```

We're intentionally trying to keeping the app simple for testing.

## Bundle

Run bundler to install the Gemfile dependencies

    bundle

Next, we'll set up the project with `jets init`.
