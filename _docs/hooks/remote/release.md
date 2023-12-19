---
title: Jets Remote Release Phase Hook
nav_text: Release
category: hooks-remote
order: 2
---

The Jets remote deploy process supports the conceptual similar [heroku release phase](https://devcenter.heroku.com/articles/release-phase).

This allows you to run custom tasks before a new release is deployed. This runs **inside** a docker container with the newly built image. The release phase can be useful for tasks such as:

* Running database schema migrations
* Priming or invalidating cache stores

Note: Assets are already supported by Jets managed tasks. Jets automatically uploads assets to the Jets managed s3 bucket and configures Rails.config.asset_host.  Of coursee, if you have customize needs you can upload assets to whichever bucket you wish with the jets release hook.

## Configure: Procfile

To configure and an release hook, you use the typical Procfile. Here's an example:

Procfile

```ruby
release: bundle exec rails db:migrate
```

You can also configure the release command with

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.release.phase.command = "bundle exec rails db:migrate"
end
```

The Procfile takes higher precedence.

## How It Works

The jets deploy process builds a docker image with the latest code. This docker image used to run the release task. The release task is ran before the release deployed.

This is useful because it allows you to run things like newly created migrations and ensure they are successfully before deployment.

## Env Vars and AWS Permissions

Jets allows to you store the secret information like DATABASE_URL in SSM and reference them in [config/jets/env]({% link _docs/env/files.md %}) files. Jets makes this info available in the release task.  The release tasks runs on the AWS CodeBuild machine looks something like this:

    docker run --rm --env-file=release.env demo-dev bundle exec rails db:migrate

Jets generates a `release.env` file that includes

* dotenv values from [config/jets/env]({% link _docs/env/files.md %}) files.
* AWS credentials that the CodeBuild project uses.

This should give the permissions to do what you need.
