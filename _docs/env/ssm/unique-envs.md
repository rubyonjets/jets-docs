---
title: SSM Unique Envs
nav_text: Unique Envs
category: env-ssm
order: 1
---

The SSM Unique Env concept is explained here.

## Problem: Proliferation of SSM Parameters

Often, you have environments like JETS_ENV `dev` and `prod` with SSM parameters like so.

    demo/dev/DATABASE_URL
    demo/prod/DATABASE_URL

If you have additional 2 environments, like `sbx` and `uat`, this can lead to a proliferation of SSM parameters to manage.

    demo/sbx/DATABASE_URL
    demo/uat/DATABASE_URL

If the app has a lot of SSM values, it can become difficult to manage, especially if you want another "dev-like" environment with only a few environment variable overrides.

## Solution: SSM Unique Envs Concept

Often, you want to have additional `sbx` and `uat` environments that are "dev-like." These environments use mostly the same environment variables except for a few overrides. The SSM Unique Envs concept reduces the number of SSM parameters to manage by supporting this pattern.

This feature is enabled by default. Here's what the default config looks like.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.dotenv.ssm.envs.unique = ["dev", "prod"] # default
  config.dotenv.ssm.envs.fallback = "dev"         # default
end
```

This means only `dev` and `prod` are considered envs that should have unique SSM parameters. All other JETS_ENV values will fallback to `dev`. Example:

    JETS_ENV=dev  => SSM:/demo/dev/DATABASE_URL
    JETS_ENV=prod => SSM:/demo/prod/DATABASE_URL
    JETS_ENV=sbx  => SSM:/demo/dev/DATABASE_URL   # Uses fallback
    JETS_ENV=uat  => SSM:/demo/dev/DATABASE_URL   # Uses fallback

## Autoload Convention Path

The autoload convention path will load the fallback env and then the JETS_ENV env SSM parameter. Let's say you have these values:

    SSM:/demo/dev/DATABASE_URL
    SSM:/demo/sbx/DATABASE_URL

Then

    JETS_ENV=dev  => SSM:/demo/dev/DATABASE_URL
    JETS_ENV=sbx  => SSM:/demo/sbx/DATABASE_URL   # Thanks to the existence of the sbx SSM parameter
    JETS_ENV=uat  => SSM:/demo/dev/DATABASE_URL   # Uses fallback

## Explicit Setting SSM Parameter Name

You can also explicitly set the SSM lookup in the `.env.JETS_ENV` file for additional overrides. Example:

config/jets/env/.env.sbx

    DATABASE=SSM:/demo/override/DATABASE_URL

## jets dotenv:list

This command helps debug your dotenv values.

    jets dotenv:list

## Disable SSM Unique Envs Concept

You can disable the SSM Unique Envs and have the JETS_ENV directly map to the SSM Name with:

config/jets/project.rb

```ruby
Jets.project.configure do
  config.dotenv.ssm.envs.unique = :all
end
```

Example:

    JETS_ENV=dev  => SSM:/demo/dev/DATABASE_URL
    JETS_ENV=prod => SSM:/demo/prod/DATABASE_URL
    JETS_ENV=sbx  => SSM:/demo/sbx/DATABASE_URL
    JETS_ENV=uat  => SSM:/demo/uat/DATABASE_URL
