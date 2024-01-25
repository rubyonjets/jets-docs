---
title: Dockerfile Stages
nav_text: Stages
category: docker
order: 2
---

Jets uses a multi-stage Docker build process. This keeps the final image size small for deployment. You also have the ability to "inject" code right into the Dockerfile at various stages.

Here's a simplified example Dockerfile with multi-stages to help explain. There's a `FROM base as build` stage and a `FROM base as deployment` stage.

{% include docker/Dockerfile.md %}

Here's how you add code to a specific stage.

config/jets/dockerfile/stage/before_build

{% assign code_line="RUN apt-get update && apt-get install -y libpq-dev postgresql-client" %}
```bash
{{ code_line }}
```

The code is literally added to the Dockerfile as the first step of the build stage. IE: The code is added to the Dockerfile right after the `FROM base as build` line. The resulting Dockerfile.

{% include docker/Dockerfile.md before_build=code_line %}

## Available Code Stages

* config/jets/dockerfile/stage/before_build
* config/jets/dockerfile/stage/after_build
* config/jets/dockerfile/stage/before_deployment
* config/jets/dockerfile/stage/after_deployment

{% include docker/Dockerfile.md
     before_build="# BEFORE_BUILD POINT"
     after_build="# AFTER_BUILD POINT"
     before_deployment="# BEFORE_DEPLOYMENT POINT"
     after_deployment="# AFTER_DEPLOYMENT POINT"
%}
