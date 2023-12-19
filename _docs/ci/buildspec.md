---
title: Jets CI BuildSpec
nav_text: BuildSpec
category: ci
order: 9
---

The Jets CI Runner uses a managed buildspec.yml. It looks something like this:

```yaml
version: 0.2
phases:
  build:
    commands:
    - curl -sSL $JETS_CI_SETUP | bash
    - bundle
    - bundle exec jets deploy -y
```

## Customizing buildspec.yml

There are 2 ways to provide a custom buildspec.yml

1. config.ci.buildspec
2. config/jets/ci/buildspec.yml

You can configure a custom path to the buildspec.yml or String with the buildspec content itself. Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ci.buildspec = "custom/buildspec.yml"
end
```

Or if the `config/jets/ci/buildspec.yml` exists, Jets use that as the buildspec.yml. Example:

config/jets/ci/buildspec.yml

```yaml
version: 0.2
phases:
  build:
    commands:
    - bundle
    - bundle exec jets deploy -y
```

Otherwise, Jets will use a managed buildspec.yml that it generates.

**Important**: You have to commit and run `jets ci:deploy` for the changes to take effect:

    jets ci:deploy
