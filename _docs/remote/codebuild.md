---
title: CodeBuild Remote Runner
nav_text: CodeBuild
category: remote
order: 1
---

Jets currently supports using CodeBuild as the remote runner. This CodeBuild project is created as part of the Jets "bootstrap" deployment.

## CodeBuild Project Properties

You can control and customize the CodeBuild project.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.environment = {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/codebuild/amazonlinux2-aarch64-standard:3.0",
    Type: "ARM_CONTAINER",
  }
  config.codebuild.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/bins/dev/GITHUB_TOKEN",
    DOCKER_PASS: "SSM:/dev/DOCKER_PASS",
    DOCKER_USER: "SSM:/dev/DOCKER_USER",
  }
end
```

* You can use different ComputeType instance sizes with different costs.
* Jets only supports Docker-capable CodeBuild Images. This is because there are limitations to the Docker Lambda Compute types. IE: You cannot use `yum install`, `apt install` or `docker build`.
* You can configure environment variables that should be set on the remote runner.

## CodeBuild Fleets

You can use Reserved capacity CodeBuild fleets if you want faster build times. These are **always** running EC2 instances to run the builds. Since they are not on-demand, there are additional costs to them.

The lowest cost Reserved fleet you can get is:

* A `reserved.arm.g1.small` costs $0.00204/minute =~ $88/mo.
* Prices change. It's noted so you have an idea of how much it'll cost.
* Other instance types are more expensive. See [CodeBuild Pricing](https://aws.amazon.com/codebuild/pricing/).

The significant benefit of a reserved fleet is caching. Jets configures the CodeBuild Project for Docker Image caching. Cached Docker layers can take your gem dependency build times to zero for most deploys, shaving minutes off the deployment times.

Note, even if you do not use Reserved fleets, Docker Image caching is turned on, but it's a best-effort cache hit. Usually, if your builds do not run within minutes of each other, you'll be given another on-demand throwaway instance that won't have your Docker layers cached.

The con is the cost. Also, if you are only running one instance in the fleet, other jobs will be stuck in the queue waiting.

{% include config/reference/header.md %}
{% include config/reference/codebuild.md %}
{% include config/reference/footer.md %}
