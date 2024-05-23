---
title: Jets Project Node Version
nav_text: Node Version
category: config
order: 10
---

Jets auto-detects your project's Ruby version and uses that version. The version is used for the base Docker Image to pull from. Example.

    FROM ruby:3.2.3-slim as base

For [package type image]({ link _docs/config/package-type.md %}), Jets uses is the official DockerHub Ruby slim variant as the base FROM image.

For [package type zip]({ link _docs/config/package-type.md %}), the default FROM uses the AWS Lambda official `public.ecr.aws/lambda/ruby` image.

## Precedence

The auto-detection precedence works in this order:

1. config
2. Gemfile
3. .tool-versions or .ruby-version
4. default

It's recommended to use either #2 Gemfile or #3 .tool-versions or .ruby-version.

### config

You can configure the Ruby version to use with a config. It takes the highest precedence.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.dockerfile.image_package.from_base.ruby_version = "3.2.3"
  # config.dockerfile.image_package.from_base.image_variant = "slim"
end
```

**Important**: The config is only recommended if you do **not** have `.ruby-version` or a `ruby` declaration in your `Gemfile`. If you have both, the remote build process may fail since the Docker base image will use the config, but the project may use another version based on `.ruby-version` or `Gemfile`. If they do not match, then the build process will fail.

### Gemfile

Jets will evaluate the `Gemfile` and use the Ruby version if there's a specified `ruby` version.

Gemfile

```ruby
ruby "3.2.3"
```

### .tool-versions or .ruby-version

If your project has a `.tool-versions` ([asdf](https://github.com/asdf-vm/asdf)) or `.ruby-version`, Jets will use that as the Docker ruby base image. If both `.tool-versions` and `.ruby-version` exist, the `.tool-versions` takes higher precedence.

### default

The Jets default Ruby version is 3.2.3. This may change in the future.

## Ruby Variants

If you do not want to use the Ruby `slim` variant, you can set it to `nil`, and Jets will use the full Docker ruby image as the base.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.dockerfile.image_package.from_base.image_variant = nil
end
```
{% include reference/config/header.md %}
{% include reference/config/deploy/dockerfile.md %}
{% include reference/config/footer.md %}

