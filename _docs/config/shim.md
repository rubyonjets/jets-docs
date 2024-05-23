---
title: "Jets Config: Shim"
nav_text: Jets Shim
category: config
order: 12
---

You can configure the Jets Shim settings with.

config/jets/shim.rb

```ruby
Jets.shim.configure do
  config.boot_path = "app.rb"
  config.rack_app = App
end
```

How it works:

1. The `boot_path` is required and "boots" the framework. IE: `require "config/environment"`. It should be at the top of the configure block.
2. The `rack_app` config is a rack-compatible app that must respond to `.call(env)`, IE: `Rails.application.call`

## Conventions

Jets can conventionally infer the shim settings. So most of the time, you do not have to configure the shim and do not need a `config/jets/shim.rb` at all.

## Rails

For Rails, it automatically does something like this:

config/jets/shim.rb

```ruby
Jets.shim.configure do |config|
  config.boot_path = "config/environment.rb"
  config.rack_app = Rails.application
end
```

## Rack App

If you have a general Rack app, you can name it `app.rb` the shim settings can also be entirely inferred. We'll explain with an example.

### Create app.rb

The `app.rb` provides the interface for the jets shim.

It must respond to a `call` method.

app.rb

```ruby
class App
  def self.call(env)
    [200, {}, ["Hello"]]
  end
end
```

The inferred shim:

config/jets/shim.rb

```ruby
Jets.shim.configure do |config|
  config.boot_path = "app.rb"
  config.rack_app = App
end
```

## Explicit Overrides

When the rack app settings cannot be inferred, you can configure `config/jets/shim.rb` with overrides.

### Sinatra Example

Here's a Sinatra example

sinatra_app.rb

```ruby
class SinatraApp < Sinatra::Base
  get '/' do
    "SinatraApp homepage"
  end
end
```

Here's a shim for Sinatra.

config/jets/shim.rb

```ruby
Jets.shim.configure do |config|
  config.boot_path = "sinatra_app.rb"
  config.rack_app = SinatraApp
end
```

Another approach is creating an `app.rb` and "aliases" it. Here's an `app.rb` for Sinatra. It aliases the SinatraApp to App. Example:

app.rb

```ruby
require_relative "sinatra_app"
App = SinatraApp
```
