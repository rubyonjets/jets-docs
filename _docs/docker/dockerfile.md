---
title: Dockerfile
category: docker
order: 1
---

Jets can use Docker to build and deploy your application. The jets-remote build process ultimately calls `docker build` for you with added conveniences. IE: Auto-detecting the framework, building a managed Dockerfile, auto-tagging the image, and more. This page covers the Dockerfile and Docker image customization options.

1. **Jets Managed Dockerfile**: Jets auto-detects the framework and builds a managed Dockerfile for you. Jets manages updates to the Dockerfile as Docker evolves. IE: You don't have to.
2. **Dockerfile.tt Template**: When there's `Dockerfile.tt` template in your project. Jets compiles it down to a `Dockerfile` and uses it.
3. **Static Dockerfile**: When there's a `Dockerfile` in your project. Jets uses it directly.
4. **Prebuilt Docker Image**: When there's a `config.docker.image` config set. Jets uses your provided prebuilt Docker image.

## Jets Managed Dockerfile

Jets creates a Managed Dockerfile when there is no `Dockerfile` or `Dockerfile.tt` in your project folder. The Jets Managed Dockerfile uses the Ruby image from DockerHub as the base image, which is Debian based. You can customize the Jets Managed Dockerfile with `config.docker`. Here's an example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.docker.packages.installer = "apt-get"
  config.docker.packages.build_stage = ["default-libmysqlclient-dev"]
  config.docker.packages.deployment_stage = ["default-mysql-client"]
end
```

The config above is used to generate the Dockerfile. Here's what it does:

* The `packages.install` config tells Jets to use `apt-get`. Currently, only apt-get is supported. This is the default value so it's not necessary to set it.
* The `default-libmysqlclient-dev` package is installed during the build Docker stage.
* The `default-mysql-client` package is installed during the deployment Docker stage.

Here is a simplified version of what the generated Dockerfile looks like:

{% include docker/Dockerfile.md %}

The Dockerfile is simplified to help understand what happens. The actual generated Dockerfile is more complex and optimized. Even in the simplified version above, you can see that Jets uses a multi-stage Docker build process. This keeps the final image size smaller for deployment.

You can perform basic customizations on Dockerfile with the `config.docker` config. This allows you to install any custom packages you might need. IE: system packages for compiled gems like mysql2.

For even more customizations, you can also inject your own code to various stages of the Dockerfile, see: [Dockerfile Code Stages]({% link _docs/docker/stages.md %}).

## Dockerfile.tt Template

Another powerful way to customize the Dockerfile is to provide your own `Dockerfile.tt` template. This is considered an advanced technique and should only be used for highly customized use cases. The Dockerfile.tt interface may change.

The `Dockerfile.tt` has access to some helper helpers: `framework_env_var`. `rails?`, `s3_bucket`. Note the helper methods may change.

## Static Dockerfile

You can provide a static `Dockerfile` in your project root. The static Dockerfile is less powerful because it does not get compiled as a template. So things like Dockerfile Code Stages cannot be injected into the Dockerfile. The benefit of a static `Dockerfile` is that it is more straightforward.

## Prebuilt Docker Image

You can also use a prebuilt Docker image. This is useful if you already have your own CI build process and want to use the Docker image it produces. Here's an example:

```ruby
Jets.deploy.configure do
  config.docker.image = ENV["DOCKER_IMAGE"] # IE: "org/repo:1.0.0"
end
```

You have to build the Docker image yourself and push it to a Docker registry. It's also your responsibility to make sure that the Docker image is Lambda compatible. IE: It has the Lambda Runtime Interface Client installed as an entrypoint and a Lambda handler.

