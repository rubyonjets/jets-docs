---
title: New Sinatra Project
nav_text: New Project
search_title: New Sinatra Project
category: learn-sinatra
order: 1
---

We'll create Sinatra project from scratch.

    mkdir sinatra
    cd sinatra

Let's create a simple Sinatra app.

app.rb

```ruby
require "sinatra/base"
require "jets-sinatra"

class App < Sinatra::Base
  get "/" do
    text = "hello from sinatra"
    puts "#{Time.now}: #{text}"
    text
  end
end
```

Let's create the Gemfile for dependencies.

Gemfile

```ruby
source "https://rubygems.org"

gem "jets-sinatra"
gem "jets", ">= 6.0"
gem "puma"
gem "sinatra"
```

We'll also create a `config.ru` so we can test locally rack-based puma server.

config.ru

```ruby
require "bundler/setup"
require_relative "app"
run App
```

We now have a simple Sinatra app.

## Bundle

Run bundler to install the Gemfile dependencies

    bundle

Next, we'll do some local testing.
