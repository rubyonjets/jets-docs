---
title: New Project
search_title: New Project Job
category: learn-job
order: 3
---

{% include videos/learn/getting-started/job.md %}

We'll use [jets new]({% link _reference/jets-new.md %}) to generate a new Jets project.

    jets new demo --mode job

The `--mode job` option generates a Jets project designed for jobs.

    ❯ jets new demo --mode job
        create  .env
        create  .gitignore
        create  Gemfile
        create  README.md
        create  Rakefile
        create  app/jobs/application_job.rb
        create  config/application.rb
        create  config/environments/development.rb
        create  config/environments/production.rb
        create  config/environments/test.rb

The project structure is nice and lightweight for job mode. For more information about the folders, see [Project Structure]({% link _docs/structure.md %}).

## Application Config

Let's take a look at the starter application config. It looks something like this:

config/application.rb

```ruby
module Demo
  class Application < Jets::Application
    config.load_defaults 5.0
    config.project_name = "demo"
    config.mode = "job"
    config.prewarm.enable = false
  end
end
```

The project_name will be used when we deploy this project. The project that is deployed will have the environment added, IE: `demo-dev`. Since this app is for jobs, [prewarming]({% link _docs/prewarming.md %}) is set to false.

You can override settings for each environment with the files in `config/environments`. Example:

config/environments/development.rb

```ruby
Jets.application.configure do
  config.cache_classes = false
  config.eager_load = false
  config.logging.event = false
end
```

For more settings see the [Config Reference]({% link _docs/config/reference.md %}).

Next, we'll explore project files and write some code.
