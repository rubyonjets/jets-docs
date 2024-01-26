---
title: Docker Build Args
nav_text: Build Args
category: docker
order: 3
---

## Build Args

You can also customize the Docker build args.  Here's an example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.docker.build_args.at.the_top = {
    "BUILD_ARG1" => "value1",
  }
  config.docker.build_args.at.build_stage = {
    "BUILD_ARG2" => "value2",
  }
  config.docker.build_args.at.deployment_stage = {
    "BUILD_ARG3" => "value3",
  }
end
```

The build args are added to near the top of different sections of the multi-stage `Dockerfile`, after Jets installs system packages, and user defined packages from `config.docker.packages`.

{% include docker/Dockerfile.md
    build_args_at_the_top="ARG BUILD_ARG1"
    build_args_at_build_stage="ARG BUILD_ARG2"
    build_args_at_deployment_stage="ARG BUILD_ARG3"
%}

## Docker Build

Jets will then call:

    docker build --build-arg BUILD_ARG1=value1 --build-arg BUILD_ARG2=value2 --build-arg BUILD_ARG2=value2 ...