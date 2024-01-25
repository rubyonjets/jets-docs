---
title: Dockerfile
category: docker
subcategory: dockerfile
order: 1
---

Jets can use Docker to build and deploy your application. The jets-remote build process ultimately calls `docker build` for you with added conveniences. IE: Auto-detecting the framework, building a managed Dockerfile, auto-tagging the image, and more. This page covers the Dockerfile and Docker image customization options.

1. **Jets Managed Dockerfile**: Jets auto-detects the framework and builds a managed Dockerfile for you. Jets manages updates to the Dockerfile as Docker evolves. IE: You don't have to.
2. **Dockerfile.tt Template**: When there's `Dockerfile.tt` template in your project. Jets compiles it down to a `Dockerfile` and uses it.
3. **Static Dockerfile**: When there's a `Dockerfile` in your project. Jets uses it directly.
4. **Prebuilt Docker Image**: When there's a `config.docker.image` config set. Jets uses your provided prebuilt Docker image.

## Jets Managed Dockerfile

{% include docker/managed-preamble.md %}

See: [Jets Managed Dockerfile]({% link _docs/docker/dockerfile/managed.md %})

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

