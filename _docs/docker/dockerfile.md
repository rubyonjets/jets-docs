---
title: Dockerfile
category: docker
subcategory: dockerfile
order: 1
---

Jets uses Docker to build and deploy your application by [default]({% link _docs/config/package-type.md %}). This page covers how it works and how to customize the Docker build process.

The Jets remote runner calls `docker build` and pushes the Docker image to ECR. Jets generates a Dockerfile. The generated Dockerfile is managed by the Jets remote build process. It can be customized for your purposes. This page covers Docker customization options.

1. **Jets Managed Dockerfile**: Jets auto-detects the framework and builds and manages Dockerfile for you. IE: You don't have to.
2. **Custom Dockerfile**: You can use a custom `Dockerfile`. Jets will build using your Dockerfile.
3. **Prebuilt Docker Image**: When there's a `config.docker.image` config set. Jets uses your provided prebuilt Docker image.

Option #1 Jets Managed Dockerfile is recommended. It's powerful, flexible, and customizable. You have a plethora of options to customize the generated Dockerfile.

Options #2 and #3 require more effort and work on your part because you need to manage the Dockerfile and are responsible for updating it entirely. You must make sure the Docker image is Lambda compatible. IE: It has the Lambda Runtime Interface Client installed as an entrypoint, a Lambda handler, any required dependencies, and patches.

## Jets Managed Dockerfile

{% include docker/managed-preamble.md %}

See: [Jets Managed Dockerfile]({% link _docs/docker/dockerfile/managed.md %})

## Custom Dockerfile

To use a custom Dockerfile and let Jets build it. You can activate it.

```ruby
Jets.deploy.configure do
  config.dockerfile.custom = true
end
```

Jets will attempt to build the Docker image using your custom Dockerfile. You will have to mimic what Jets does with the Jets Managed Dockerfile. Jets scripts will get updated over time, and you must keep it up-to-date. Using your own Dockerfile is also less powerful than the Jets generated Dockerfile because Jets cannot inject dynamic logic, like installing system packages based on gem auto-detection.

**Note**: You can also provide a String as a path `config.dockerfile.custom = "dockerfiles/Dockerfile1"`

## Prebuilt Docker Image

You can also use a prebuilt Docker image. This can be useful if you already have your own CI build process and want to use the Docker image it produces. You use `JETS_DOCKER_IMAGE`. Example:

    JETS_DOCKER_IMAGE=my/image:v1 jets deploy

The Docker build process will be skipped. Jets will push the image to ECR, though. This is what Lambda has access to the image and it's faster to pull down within the AWS network.

{% include reference/config/header.md %}
{% include reference/config/deploy/docker.md %}
{% include reference/config/footer.md %}

