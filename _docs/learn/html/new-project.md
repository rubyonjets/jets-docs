---
title: New Project
search_title: New Project API
category: learn-html
order: 3
---

{% include videos/learn/getting-started/html.md %}

We'll use [jets new]({% link _reference/jets-new.md %}) to generate a new Jets project.

    jets new demo --mode html

We're using the `--mode html` option to generate a Jets project designed for HTML apps. Note that the default mode is HTML, so it's optional in this case.

    ❯ jets new demo
          create  .env
          create  .gitignore
          create  .rspec
          create  Gemfile
          create  README.md
          create  Rakefile
          create  app/assets/config/manifest.js
          create  app/assets/images/.keep
          create  app/assets/javascripts/.keep
          create  app/assets/stylesheets/application.css
          create  app/controllers/application_controller.rb
          create  app/helpers/application_helper.rb
          create  app/jobs/application_job.rb
          create  app/models/application_record.rb
          create  app/views/layouts/application.html.erb
          create  config.ru
          create  config/application.rb
          create  config/database.yml
          create  config/environments/development.rb
          create  config/environments/production.rb
          create  config/environments/test.rb
          create  config/initializers/content_security_policy.rb
          create  config/initializers/filter_parameter_logging.rb
          create  config/initializers/permissions_policy.rb
          create  config/routes.rb
          create  db/.gitkeep
          create  public/404.html
          create  public/422.html
          create  public/500.html
          create  public/favicon.ico
          create  spec/controllers/posts_controller_spec.rb
          create  spec/fixtures/payloads/posts-index.json
          create  spec/fixtures/payloads/posts-show.json
          create  spec/spec_helper.rb

For more information about the folders and files, see [Project Structure]({% link _docs/structure.md %}).

## Application Config

Let's take a look at the starter application config. It looks something like this:

config/application.rb

```ruby
module Demo
  class Application < Jets::Application
    config.load_defaults 5.0
    config.project_name = "demo"
    config.mode = "html"
  end
end
```

The project_name will be used when we deploy this project. The project that is deployed will have the environment added, IE: `demo-dev`.

You can override settings for each environment with the files in `config/environments`. Example:

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
