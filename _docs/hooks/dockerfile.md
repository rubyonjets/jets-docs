---
title: Jets Dockerfile Stage Hooks
nav_text: Dockerfile
category: hooks
order: 2
---

{% include notes/experimental.md %}

Jets uses a multi-stage Docker build process. This keeps the final image size small for deployment. You also have the ability to "inject" code right into the Dockerfile at various Dockerfile stage hook points.

## Stage Hooks

* config/jets/dockerfile/stage/before_build
* config/jets/dockerfile/stage/after_build
* config/jets/dockerfile/stage/before_deployment
* config/jets/dockerfile/stage/after_deployment

## Example

Here's a simplified example Dockerfile with multiple stages to help explain. There's a `FROM base as build` stage and a `FROM base as deployment` stage.

{% include docker/Dockerfile.md %}

Here's how you add code to a specific stage.

config/jets/dockerfile/stage/before_build

{% assign code_line="RUN apt-get update && apt-get install -y libpq-dev postgresql-client" %}
```bash
{{ code_line }}
```

The code is literally added to the Dockerfile as one of the first steps to the stage. IE: The code is added to the Dockerfile after the `FROM base as build`, Jets installs system packages, and user defined packages from `config.docker.packages`. The resulting Dockerfile.

{% include docker/Dockerfile.md before_build=code_line %}

{% include docker/Dockerfile.md
before_build="# BEFORE_BUILD POINT"
after_build="# AFTER_BUILD POINT"
before_deployment="# BEFORE_DEPLOYMENT POINT"
after_deployment="# AFTER_DEPLOYMENT POINT"
%}
