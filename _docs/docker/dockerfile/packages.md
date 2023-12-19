---
title: Dockerfile Custom Packages
nav_text: Custom Packages
category: dockerfile
order: 2
---

## Custom Packages

You can add custom system packages to install in the generated Jets Managed Dockerfile with `config.dockerfile`. This can be useful for compiled gems like mysql2 that require system packages. Here's an example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.dockerfile.apt.packages.build_stage = ["default-libmysqlclient-dev"]
  config.dockerfile.apt.packages.deployment_stage = ["default-mysql-client"]
end
```

There are 2 different package stages because `default-libmysqlclient-dev` is only required for building the gem, while the lighter `default-mysql-client` package is required for runtime.

## apt vs yum

Jets can deploy your app as a Docker Image or a Zip file package. The Docker Image uses `config.dockerfile.apt.packages`. The Zip file package uses `config.dockerfile.yum.packages`. Examples:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.package_type = "image"
  config.dockerfile.apt.packages.build_stage = ["default-libmysqlclient-dev"]
  config.dockerfile.apt.packages.deployment_stage = ["default-mysql-client"]
end
```

If you have `config.package_type = "yum"`.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.package_type = "yum"
  config.dockerfile.yum.packages.build_stage = ["mysql-devel"]
  config.dockerfile.yum.packages.deployment_stage = ["mysql-devel"]
end
```

## Auto Detected Packages

Jets provides some auto-detection of required packages based on your Gemfile. The mysql2 gem above is not actually required, and Jets automatically detects the required packages. It supports gems and libraries like MySQL and Postgresql. This means that the mysql2 example config above is not needed. It's just provided as an example.  If you need to turn on or off the `auto_packages` behavior.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.dockerfile.auto_packages = true # default true
end
```

## Even More Customizations

For even more customizations, you can also inject your own code to various stages of the Dockerfile, see: [Dockerfile Code Stages]({% link _docs/docker/stages.md %}).

