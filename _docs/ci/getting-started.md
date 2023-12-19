---
title: Jets CI Getting Started
nav_text: Getting Started
category: ci
order: 1
---

## Initial Settings

Run the generator to configure some initial settings.

    jets ci:init

This configures `deploy.rb` and adds `config.ci` settings. It looks something like this:

config/jets/ci.rb

```ruby
Jets.deploy.configure do
  config.ci.source = {
    Type: "GITHUB",
    Location: "https://github.com/ORG/REPO"
  }
  config.ci.source_version = "main"
  config.ci.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
    JETS_API_TOKEN: "SSM:/#{ssm_env}/JETS_API_TOKEN"
  }
  config.ci.triggers = true
end
```

**Note**: The `config.ci` can be in `config/ci.rb` or `config/deploy.rb`. It's recommended to use `ci.rb` to make it clear that it's for CI settings. Similarly, you can also have  `config/ci/dev.rb` and `config/ci/prod.rb`.

* Please adjust the source location and env vars for your own account.
* The `BUNDLE_GITHUB__COM` env var is required if you have private repos in your Gemfile.

The CI runner uses CodeBuild and a `buildspec.yml` script that does something like this,

    curl -sSL $JETS_CI_SETUP | bash
    bundle
    bundle exec jets deploy -y

It's essentially runs `bundle` and then `jets deploy`. IE: What you would normally do to deploy.  If your `Gemfile` has has private repos, you may have to configure `BUNDLE_GITHUB__COM`.

## Required Settings

These settings are required:

    config.ci.source Type
    config.ci.source Location
    config.ci.env.vars JETS_API_TOKEN

## Deploy

Deploy the CodeBuild project that handles Continous Integration.

    jets ci:deploy

The CodeBuild project has a `-ci` suffix, IE: demo-dev-ci

Note, Jets creates a **separate** CloudFormation stack for the ci project.

## Start

You can manually kick off a CI run with

    jets ci:start

The CI run is normally started with a `git push` from triggers. See: [Triggers]({% link _docs/ci/triggers.md %})

Also, remember that your code needs to be pushed to git.  A `jets ci:start` uses code from the remote repo, local changes will not be deployed, vs. `jets deploy` packages up code locally and deploys it. You can also specify different remote branches to use for that specific CI run.

    jets ci:start --branch feature1

## Delete

To delete the CI CodeBuild project.

    jets ci:delete

This only deletes the **separate** CloudFormation stack and CI CodeBuild Project, not the Jets app itself.
