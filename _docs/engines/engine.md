---
title: Jets Engines
nav_text: Engine
category: engines
order: 1
---

Jets Engines allow you to hook into and extend the Jets framework. Jets Engines are port of Rails Engines.

## An Engine is a Gem

An engine is written as a gem. So you add it to the Gemfile. Example:

Gemfile

```ruby
gem "blorgh", path: "engines/blorgh"
```

Note, we're specifying the gem location with a local path.  Jets conventionally includes the `engines` local folder as part of the `bundle install` step within `jets deploy`. If you're using a local folder else where, you have to specify it in a config option.

config/application.rb

```ruby
class Demo < Jets::Application
  config.bundle_install_folders = ["other_engines"] # engines is the default and already included
end
```

## Require Engine

The typical pattern to require an engine and have it load is

lib/blorgh/engine.rb

```ruby
module Blorgh
  class Engine << Jets::Engine
    isolate_engine Blorgh
  end
end

lib/blorgh.rb

```ruby
# ...
require "blorgh/engine" if defined?(Jets::Engine)
```

## Mount

```ruby
Jets.application.configure do
  mount "/blog" => Blorgh
end
```

## Engines Controllers, Helpers, Views

Engines allow you to define an `app` folder at the top-level folder within your gem. Jets considers these folders as part of the paths lookups. It's similar to how `LOAD_PATH` works.

    app
    ├── controllers
    │   └── blorgh
    │       └── articles_controller.rb
    ├── helpers
    │   └── blorgh
    │       └── articles_helper.rb
    └── views
        └── articles
            ├── _form.html.erb
            ├── edit.html.erb
            ├── index.html.erb
            └── show.html.erb

## Isolate Engine

The isolate_engine tells Jets to keep the engines code isolated from the main app. For examples, helpers will only be available within the helpers. Unless you refer to the helpers with the engine `blorgh` proxy.

For example, let's say you defined a helper

app/helpers/blorgh/articles_helper.rb

```ruby
module Blorgh
  module ArticlesHelper
    def my_helper
    end
  end
end
```

The `my_helper` method is only available within where the blorgh is mounted. IE: '/blog' If you try to call `my_helper` from a main app path like `/posts`, you'll get a `NoMethodDefined` error.

You can always call the fully qualified engine helper though. IE:

    blorgh.my_helper # alway available

Likewise, you can call the main app's helper from within the engine like so:

    main_app.my_posts_helper

It can be useful to fully qualify the helper if you have an helper method with the same name in both the `main_app` and `blorgh` engine.
