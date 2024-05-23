---
title: Jets Env SSM Parameter Store Support
nav_text: SSM
category: env
subcategory: env-ssm
order: 3
---

AWS Systems Manager Parameter Store is supported. Jets dotenv files support referencing SSM Parameter Store values. This behavior only applies to Jets `config/jets/env` files.

{% include env/ssm/conventions.md %}

## Explicit SSM Usage in Env Files

Storing secrets as SSM Parameters and referencing them your `.env` files allows you to commit your `.env` into source control. When you reference a parameter name with it will prefix the conventional `/PROJECT/ENV/`. If you reference the parameter name with a leading / then the conventional prefix is not added. For example:

    RELATIVE_DATABASE_URL=SSM:database-url          # references /PROJECT/ENV/database-url
    ABSOLUTE_DATABASE_URL=SSM:/path/to/database-url # references /path/to/database-url

The SSM parameters are fetched and interpolated into your environment at build time. After changing your SSM parameters, make sure to re-deploy your app to ensure they are picked up correctly.

## Config

To customize the conventional behavior, you can use.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.dotenv.ssm.one_dev = true
  config.dotenv.ssm.convention_resolver = ->(ssm_leaf_name) do
    "/#{Jets.project.name}/#{ssm_env}/#{ssm_leaf_name}"
  end
end
```

**Tip**: Use `jets dotenv:list` to quickly test changes.

## SSM Helper: ssm_env

The `ssm_env` helper resolves to an env value that is smarter than `Jets.env`.

For `JETS_ENV=dev` and `JETS_ENV=prod`, ssm_env returns the corresponding `JETS_ENV`. For other values, ssm_env returns `dev.` This is because users often want additional dev-like environments but do not want to have to recreate all the SSM secrets for each environment. This allows the SSM params to be DRY. Here are some examples to explain:

    JETS_ENV=dev  # ssm_env => dev
    JETS_ENV=prod # ssm_env => prod
    JETS_ENV=qa   # ssm_env => dev   # config.dotenv.ssm.one_dev = true

This behavior can be changed with `config.dotenv.ssm.one_dev = false`. In that case, JETS_ENV is passed through.

    JETS_ENV=dev  # ssm_env => dev
    JETS_ENV=prod # ssm_env => prod
    JETS_ENV=qa   # ssm_env => qa   # config.dotenv.ssm.one_dev = false

## Shared SSM Parameters Example

The `ssm_env` helper is also useful for shared env values. Here's an example:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
    DOCKER_PASS: "SSM:/#{ssm_env}/DOCKER_PASS",
    DOCKER_USER: "SSM:/#{ssm_env}/DOCKER_USER",
    # Use your own docker host
    DOCKER_HOST: "SSM:/#{ssm_env}/DOCKER_HOST",
    JETS_SSH_KEY: "SSM:/#{ssm_env}/JETS_SSH_KEY",
    JETS_SSH_KNOWN: "SSM:/#{ssm_env}/JETS_SSH_KNOWN"
  }
end
```

This allows you to re-use the same SSM parameters for multiple projects and makes easier to manage and rotate them.

{% include reference/config/header.md %}
{% include reference/config/bootstrap/dotenv.md %}
{% include reference/config/footer.md %}
