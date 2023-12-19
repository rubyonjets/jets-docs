---
title: Jets Remote Runner Managed Hook Docker
nav_text: Docker
category: hooks-remote-managed
order: 3
---

The Jets Managed SSH Docker will log into docker.

This allows the build process to `docker pull` from repos that require auth.

### Docker Login

The `docker login` command will run before the remote `jets deploy` with the `DOCKER_USER` and `DOCKER_PASS` env vars. Something like this:

    echo "$DOCKER_PASS" | docker login --username $DOCKER_USER --password-stdin

This helps the `docker pull` and `docker build` commands avoid the DockerHub rate limit.

## Configure Remote Runner

Here's an example of how you configure this hook for the CodeBuild Remote Runner

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    DOCKER_USER: "SSM:/#{ssm_env}/DOCKER_USER",
    DOCKER_PASS: "SSM:/#{ssm_env}/DOCKER_PASS",
  }
end
```

## Configure CI Runner

Here's an example of how you configure this hook for the CodeBuild CI Runner

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.ci.env.vars = {
    DOCKER_USER: "SSM:/#{ssm_env}/DOCKER_USER",
    DOCKER_PASS: "SSM:/#{ssm_env}/DOCKER_PASS",
  }
end
```

{% include hooks/ssm-redacted.md %}
