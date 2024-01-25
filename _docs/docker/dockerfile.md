---
title: Dockerfile
category: docker
order: 2
---

Jets can use Docker to build and deploy your application. The jets-remote build process ultimately calls `docker build` for you with added conveniences. IE: Auto-detecting the framework and building a managed Dockerfile. This page covers the Dockerfile and Docker image customization options.

1. **Jets Managed Dockerfile**: Jets auto-detects the framework and builds a managed Dockerfile for you. Jets manages updates to Dockerfile as Docker evolves. IE: You don't have to. Jets does this when there is no `Dockerfile` or `Dockerfile.tt` in your project folder.
2. **Dockerfile.tt Template**: When there's `Dockerfile.tt` template in your project. Jets compiles it down to a `Dockerfile` and uses it.
3. **Static Dockerfile**: When there's a `Dockerfile` in your project. Jets uses it directly.
4. **Prebuilt Docker Image**: When there's a `config.docker.image` config set. Jets uses your provided prebuilt Docker image.

## Managed Dockerfile with config.docker

You can customize the Jets Managed Dockerfile with `config.docker`. Here's an example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.docker.packages.installer = "apt-get"
  config.docker.packages.build_stage = ["default-libmysqlclient-dev"]
  config.docker.packages.deployment_stage = ["default-mysql-client"]
end
```

* The packages config tells Jets to use `apt-get` as the package installer.
* To install the `default-libmysqlclient-dev` package during the build Docker stage.
* The `default-mysql-client` package is installed during the deployment Docker stage.
* The `installer` config is optional. Jets can auto-detect it based on the Docker image. It defaults to `apt-get` when auto-detection fails.

Here is a simplified version of what the generated Dockerfile looks like:

Dockerfile

```Dockerfile
FROM ruby:3.2.3-slim as base
# ...
FROM base as build
RUN apt-get update && apt-get install -y default-libmysqlclient-dev
RUN bundle install
# ...
FROM base as deployment
RUN apt-get update && apt-get install -y default-mysql-client
COPY --from=build /usr/local/bundle /usr/local/bundle
# ...
ENTRYPOINT [ "aws_lambda_ric" ]
CMD [ "handlers/controller.lambda_handler" ]
```

The Dockerfile is simplified to help understand what happens. The actual generated Dockerfile is more complex and optimized. Even in the simplified version above, you can see that Jets uses a multi-stage Docker build process. This keeps the final image size small for deployment.

The basic concept is that you can customize the Dockerfile and build process with the `config.docker` config. This allows you to install any custom packages you might need.

## Dockerfile Code Stages

There's also the ability to add "inject" code right into the Dockerfile at various stages. Here's an example:

config/jets/dockerfile/stage/before_build

```bash
RUN apt-get update && apt-get install -y libpq-dev postgresql-client vim && rm -rf /var/lib/apt/lists/*
```

The code is literally added to the Dockerfile as the first step of the build stage. IE: The code is added to the Dockerfile right after the `FROM base as build` line.

Available code stages:

* config/jets/dockerfile/stage/before_build
* config/jets/dockerfile/stage/after_build
* config/jets/dockerfile/stage/before_deployment
* config/jets/dockerfile/stage/after_deployment

## Advanced Dockerfile.tt

Another powerful way to customize the Dockerfile is to provide your own `Dockerfile.tt` template. This should probably only be used for highly customized use cases, but it is available if needed.

The `Dockerfile.tt` has helpers:

* framework_env_var
* rails?
* s3_bucket

## Static Dockerfile

You can provide a static `Dockerfile` in your project root. The static Dockerfile is less powerful because it does not get compiled as a template. So things like Dockerfile Code Stages cannot be injected into the Dockerfile. The benefit of a static `Dockerfile` is that it is more straightforward.

## Prebuilt Docker Image

You can also use a prebuilt Docker image. This is useful if you already have your own CI build process and want to use the Docker image it produces. Here's an example:

```ruby
Jets.deploy.configure do
  config.docker.image = ENV[''DOCKER_IMAGE"] # IE: "org/repo:1.0.0"
end
```

You have to build the Docker image yourself and push it to a Docker registry. You also have to make sure that the Docker image is Lambda compatible. IE: It has the Lambda Runtime Interface Client installed as an entrypoint and a Lambda handler.

