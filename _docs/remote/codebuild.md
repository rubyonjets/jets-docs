---
title: CodeBuild Remote Runner
nav_text: CodeBuild
category: remote
subcategory: remote-codebuild
order: 1
---

Jets currently supports using CodeBuild as the remote runner. This CodeBuild project is created as part of the Jets "bootstrap" deployment. CodeBuild provides the raw horsepower, internet speed, and CPU architecture. IE: arm64 vs x86_64

## CodeBuild Project Properties

You can control and customize the CodeBuild project.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.environment = {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/codebuild/amazonlinux2-aarch64-standard:3.0",
    Type: "ARM_CONTAINER",
  }
  config.codebuild.project.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/bins/dev/GITHUB_TOKEN",
    DOCKER_PASS: "SSM:/dev/DOCKER_PASS",
    DOCKER_USER: "SSM:/dev/DOCKER_USER",
  }
end
```

* You can use different ComputeType instance sizes with different costs.
* Jets supports Docker-capable CodeBuild Images. This is because there are limitations to the Docker Lambda Compute types. IE: You cannot use `yum install`, `apt install` or `docker build` with Lambda Compute types vs Linux compute types.
* You can configure environment variables that should be set on the remote runner.

## Faster Builds

If you want faster builds, consider using [CodeBuild Fleets]({% link _docs/remote/codebuild/fleet.md %}).

{% include config/reference/header.md %}
{% include config/reference/codebuild.md %}
{% include config/reference/footer.md %}
