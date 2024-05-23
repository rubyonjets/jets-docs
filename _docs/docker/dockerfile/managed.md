---
title: Jets Managed Dockerfile
nav_text: Managed
category: dockerfile
order: 1
---

{% include docker/managed-preamble.md %}

Jets uses a multi-stage Docker build process to help keep the final deployment image small.  Here is a simplified version of what the generated Dockerfile looks like:

{% include docker/Dockerfile.md %}

The Dockerfile is simplified to help understand. The managed Dockerfile is more complex and optimized. In the version above, you can see that Jets uses a multi-stage Docker build process. This keeps the final image size smaller for deployment.

Jets uses different Docker base images depending on the Lambda Package type:

* **Image Package Type**: Jets uses the official DockerHub Ruby image, IE: `ruby:3.2.3-slim`.
* **Zip Package Type**: Jets uses the official AWS Lambda Image, IE: `public.ecr.aws/lambda/ruby:3.2`

The Image Package Type is recommended and is the default. This is because CloudFormation cannot change package types without deleting and recreating the app. The default Image Package allows for large packages and is more flexible.

For the Zip Package Type, docker build gem dependencies simpily.

{% include reference/config/header.md %}
{% include reference/config/deploy/docker.md %}
{% include reference/config/footer.md %}

