---
title: New Rack Project
nav_text: New Project
search_title: New Rack Project
category: learn-rack
order: 1
---

We'll create Rack project from scratch.

    mkdir rack
    cd rack

Let's create a simple Rack app.

app.rb

```ruby
class App
  def self.call(env)
    text = "hello from rack"
    puts "#{Time.now}: #{text}"
    headers = {"Content-Type" => "text/plain"}
    body = [text]
    status = 200
    [status, headers, body]
  end
end
```

Let's create the Gemfile for dependencies.

Gemfile

```ruby
source "https://rubygems.org"

gem "jets", ">= 6.0"
gem "puma"
```

We'll also create a `config.ru` so we can test locally rack-based puma server.

config.ru

```ruby
require "bundler/setup"
require_relative "app"
run App
```

We're intentionally trying to keeping the app simple for testing.

## Bundle

Run bundler to install the Gemfile dependencies

    bundle

Next, we'll do some local testing.
