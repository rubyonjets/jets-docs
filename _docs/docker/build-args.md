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
  config.docker.build.args = {
    "BUILD_ARG" => "value",
  }
end
```

This will set the `BUILD_ARG` build args.  The build args added to the top of `Dockerfile`. Jets will then call

    docker build --build-arg BUILD_ARG=value ...

The `ARG` Docker instruction is added to the top of the Dockerfile automatically.

Dockerfile

```dockerfile
ARG BUILD_ARG
FROM ruby:3.2.3-slim as base
# ...
```
