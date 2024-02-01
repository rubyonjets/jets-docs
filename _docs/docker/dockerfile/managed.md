---
title: Jets Managed Dockerfile
nav_text: Managed
category: dockerfile
order: 1
---

{% include docker/managed-preamble.md %}

Here is a simplified version of what the generated Dockerfile looks like:

{% include docker/Dockerfile.md %}

The Dockerfile is simplified to help understand. The actual generated Dockerfile is more complex and optimized. Even in the simplified version above, you can see that Jets uses a multi-stage Docker build process. This keeps the final image size smaller for deployment.

## Config Customization

You can customize the Jets Managed Dockerfile with `config.docker`. This allows you to do basic customizations like installing any packages you might need. IE: system packages for compiled gems like mysql2. Here's an example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.docker.dockefile.packages.installer = "apt-get"
  config.docker.dockefile.packages.build_stage = ["default-libmysqlclient-dev"]
  config.docker.dockefile.packages.deployment_stage = ["default-mysql-client"]
end
```

The config above is used to generate the Dockerfile. Here's what it does:

* The `packages.install` config tells Jets to use `apt-get`. Currently, only apt-get is supported. This is the default value so it's not necessary to set it.
* The `default-libmysqlclient-dev` package is installed during the build Docker stage.
* The `default-mysql-client` package is installed during the deployment Docker stage.

{% include config/reference/header.md %}
{% include config/reference/docker.md %}
{% include config/reference/footer.md %}

## Even More Customizations

For even more customizations, you can also inject your own code to various stages of the Dockerfile, see: [Dockerfile Code Stages]({% link _docs/docker/stages.md %}).
