---
title: New Project
search_title: New Project API
category: learn-api
order: 3
---

We'll use [jets new]({% link _reference/jets-new.md %}) to generate a new Jets project.

    jets new demo --mode api

We're using the `--mode api` option to generate a Jets project designed for APIs.

    ❯ jets new demo --mode api
          create  .env.development
          create  .env
          create  .gitignore
          create  Gemfile
          create  README.md
          create  Rakefile
          create  app/controllers/application_controller.rb
          create  app/helpers/application_helper.rb
          create  app/APIs/application_API.rb
          create  app/models/application_record.rb
          create  config.ru
          create  config/application.rb
          create  config/database.yml
          create  config/environments/development.rb
          create  config/environments/production.rb
          create  config/environments/test.rb
          create  config/initializers/filter_parameter_logging.rb
          create  config/routes.rb
          create  db/.gitkeep
          create  public/404.html
          create  public/422.html
          create  public/500.html
          create  public/favicon.ico

The project structure is lightweight for api mode. For more information about the folders see [Project Structure]({% link _docs/structure.md %}).

## Application Config

Let's take a look at the starter application config. It looks something like this:

config/application.rb

```ruby
module Demo
  class Application < Jets::Application
    config.load_defaults 5.0
    config.project_name = "demo"
    config.mode = "api"
  end
end
```

The project_name will be used when we deploy this project. The project that is deployed will have the environment added, IE: `demo-dev`.

You can override settings for each enviroment with the files in `config/environments`. Example:

config/environments/development.rb

```ruby
Jets.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.logging.event = true
end
```

For more settings see the [Config Reference]({% link _docs/config/reference.md %}).

Next, we'll review the generated project files.
