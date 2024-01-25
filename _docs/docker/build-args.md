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
    "RUBY_VERSION" => "3.2.3",
  }
end
```

This will set the `RUBY_VERSION` build args.  The build args added to the top of `Dockerfile`. Jets will then call

    docker build --build-arg RUBY_VERSION=3.2.3 ...

## Example: BUNDLE

BUNDLE_GITHUB__COM: "SSM:/bins/dev/GITHUB_TOKEN",