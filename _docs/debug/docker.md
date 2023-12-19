---
title: Jets Docker Debug Tricks
nav_text: Docker
category: debug
order: 6
---

Jets builds and pushes a Docker image for deployment to AWS Lambda. If you are familiar with Docker, this knowledge can be useful for debugging the Docker image. We'll cover a few tricks to help you do this.

## Jets Dockerfile

A `jets deploy` will also download the generated Dockerfile to `/tmp/jets/APP/docker/Dockerfile`. Note that the Dockerfile contains instructions only on the remote runner. However, it can be helpful to review the Dockerfile. You can also generate this Dockerfile with

    jets package:dockerfile

## Start Container Locally

You can also use the Docker image to start up a local Docker container locally for debugging. Here's how.

    jets release:info
    DOCKER_IMAGE=$(jets release:info --format json | jq -r '."Docker Image"')
    docker run --rm -ti --entrypoint '' $DOCKER_IMAGE bash

You have to override the `entrypoint` since that's what AWS Lambda uses as the interface between the Lambda service and Docker image. Once you're in the container, you can review the code within it and see if things are set up properly.
