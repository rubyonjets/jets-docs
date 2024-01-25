---
title: Remote Runner Hooks
nav_text: Hooks
category: remote
order: 2
---

If needed, you can hook into the remote runner build process and run custom code.

These hook scripts or commands run on the CodeBuild server at the host-level. In other words, outside of Docker.

## Hooks

Available hooks:

* before_deploy
* after_deploy
* before_delete
* after_delete

Here's a simplified example to explain how they run:

```yaml
phases:
  build:
    commands:
    - ./before_deploy
    - ./jets-remote deploy
    - ./after_deploy
```

## Configure

To configure remote hooks, define them in a folder like so:

config/jets/remote/hooks/before_deploy

```bash
#!/bin/bash
echo "running my before_deploy bash hook script"
```

The script can be written in any language available on the codebuild remote runner. Here's an example in Ruby.

config/jets/remote/hooks/before_deploy

```bash
#!/usr/bin/env ruby
puts "running my before_deploy ruby hook script"
```

## Managed Hooks

Jets provides managed hooks for some tasks. You can enable them with a config and typically a CodeBuild project env vars. Here is an example with github_clone and docker_login.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.remote.hooks.managed.github_clone = true
  config.remote.hooks.managed.docker_login = true

  config.codebuild.env.vars = {
    DOCKER_PASS: "SSM:/dev/DOCKER_PASS",
    DOCKER_USER: "SSM:/dev/DOCKER_USER",
    GITHUB_TOKEN: "SSM:/dev/GITHUB_TOKEN",
  }
end
```

Note: We're using SSM to set the env so that they are **redacted** in codebuild logs. You need to create the SSM Parameter on your AWS account.

### Docker Login

The `docker login` command will run before the `jets-remote deploy` with the `DOCKER_USER` and `DOCKER_PASS` env vars. Something like this:

    echo "$DOCKER_PASS" | docker login --username $DOCKER_USER --password-stdin

This helps the `docker pull` and `docker build` commands avoid the DockerHub rate limit.

### Github Clone

For the `github_clone`, it does something like this before `jets-remote deploy`.

    git config --global url."https://${GITHUB_TOKEN}:@github.com".insteadOf "https://github.com"

This tells `git clone` to use the GITHUB_TOKEN and is useful for private repos.  This technique works for `Gemfile` gems when `bundle install` runs.

### Managed Hooks Updates

Jets maintains and updates the managed hooks-produced code when needed. IE: You don't have to.

Note: We recommend the approach over `BUNDLE_GITHUB__COM`, since `BUNDLE_GITHUB__COM` will persist the token in the `Gemfile.lock`. The `gti confg insteadOf` approach won't persist the token to `Gemfile.lock`.

## Customize buildspec.yml

You can also customize the CodeBuild remote runner `buildspec.yml`. Create the file in your project root.

buildspec.yml

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      ruby: latest
  build:
    commands:
    - echo "hello custom logic"
    - RUN_JETS_REMOTE
```

Note: The `RUN_JETS_REMOTE` is a special marker that should be in the `buildspec.yml`. It is validated by Jets and used to run the `jets-remote` process.

This ability should probably be reserved for super special use cases. Let us know what you're using it for so we can consider implementing it in Jets more natively, IE: a managed hook.
