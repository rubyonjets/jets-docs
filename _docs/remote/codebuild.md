---
title: CodeBuild Remote Runner
nav_text: CodeBuild
category: remote
subcategory: remote-codebuild
order: 1
---

{% include remote/intro.md %}

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
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
    DOCKER_PASS: "SSM:/#{ssm_env}/DOCKER_PASS",
    DOCKER_USER: "SSM:/#{ssm_env}/DOCKER_USER",
  }
end
```

* You can use different ComputeType instance sizes with different costs.
* Jets mainly uses the EC2 CodeBuild ComputeType. This is because the Docker Lambda Compute types have limitations. For example, you cannot use `yum install`, `apt install`, or `docker build` with Lambda Compute types compared to Linux compute types.
* You can configure environment variables that should be set on the remote runner.

## Faster Builds

If you want faster builds, consider using a [Remmote Docker Host]({% link _docs/remote/codebuild/docker-host.md %}) or [CodeBuild Fleets]({% link _docs/remote/codebuild/fleet.md %}).

{% include reference/config/header.md %}
{% include reference/config/deploy/codebuild.md %}
{% include reference/config/footer.md %}
