---
title: New Hanami Project
nav_text: New Project
search_title: New Hanami Project
category: learn-hanami
order: 1
---

Let's `hanami new` to generate a new Hanami project.

    hanami new demo

We're using the `--database mysql` option for the mysql database adapter since we later deploy this to AWS Lambda.

    ❯ hanami new demo
    Created demo/
    -> Within demo/
    Created .gitignore
    Created .env
    Created README.md
    Created Gemfile
    Created Rakefile
    Created Procfile.dev
    Created config.ru
    Created bin/dev
    Created config/app.rb
    Created config/settings.rb
    Created config/routes.rb
    Created config/puma.rb
    Created lib/tasks/.keep
    Created lib/demo/types.rb
    Created app/actions/.keep
    Created app/action.rb
    Created app/view.rb
    Created app/views/helpers.rb
    Created app/templates/layouts/app.html.erb
    Created package.json
    Created config/assets.js
    Created app/assets/js/app.js
    Created app/assets/css/app.css
    Created app/assets/images/favicon.ico
    Created public/404.html
    Created public/500.html
    Running Bundler install...
    Running NPM install...
    Running Hanami install...
    ❯ mv demo hanami
    ❯ cd hanami

This gives us a starter Hanami project.

## Scaffold

Let's use hanami scaffolding to generate some code.

    ❯ cd hanami
    ❯ hanami generate scaffold post title:string body:text published:boolean

This gives us some basic CRUD actions.

## Root Route: Home Page

Let's also add a root route and point it to `posts#index`

config/routes.rb

```ruby
module Demo
  class Routes < Hanami::Routes
    root to: "home.show" # <= ADD THIS
  end
end
```

## Add Home Action

Generate a home.show action

    ❯ hanami generate action home.show
    Updated config/routes.rb
    Created app/actions/home/
    Created app/actions/home/show.rb
    Created app/views/home/
    Created app/views/home/show.rb
    Created app/templates/home/
    Created app/templates/home/show.html.erb
    Created spec/actions/home/show_spec.rb

app/actions/home/show.rb

```ruby
module Demo
  module Actions
    module Home
      class Show < Demo::Action
        def handle(request, response)
        end
      end
    end
  end
end
```

The view looks like this:

app/templates/home/show.html.erb

```html
<h1>Demo::Views::Home::Show</h1>
```
