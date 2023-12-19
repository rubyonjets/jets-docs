---
title: SSM Legacy Values
nav_text: Legacy
category: env-ssm
order: 3
---

The SSM name conventions supports a few legacy options. This can help if you're upgrading to Jets 6 and still want to keep old SSM parameter names.

## Legacy Long Env Name

Jets 6, uses short env names like `JETS_ENV=dev` and `JETS_ENV=prod`. Jets 5 and below used longer `JETS_ENV=development` and `JETS_ENV=production`. Users migrating to Jets 6 may already have SSM parameters with longer names.

Jets 5 longer parameter names example:

    DATABASE_URL=SSM  # => /demo/development/DATABASE_URL

Jets 6 shorter parameter names example:

    DATABASE_URL=SSM  # => /demo/dev/DATABASE_URL

If you want the SSM convention name to resolve to the Jets 5 longer names, you can do so with `config.dotenv.ssm.long_env_name = true`

config/jets/project.rb

```ruby
Jets.project.configure do
  config.dotenv.ssm.long_env_name = true
end
```

This tells Jets 6 to resolve the SSM name to their legacy long names: `DATABASE_URL=SSM => /demo/development/DATABASE_URL`.

## Legacy Project Name

Let's say you're deploying another version of your project and want to rename the stack. IE: `demo => demo-v2`. At the same time, you still want to use the old project name for SSM names.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.name = "demo-v2"
  config.dotenv.ssm.project_name = "demo"
end
```

This allows you to deploy to a `demo-v2-dev` stack while still using the old project name. Example:

    stack => demo-v2-dv
    DATABASE_URL=SSM => /demo/dev/DATABASE_URL

## ssm_env Helper

This is not a legacy helper; it's new in Jets 6. For completeness, you can customize the behavior of the `ssm_env` config helper for long or short env names.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.dotenv.ssm.long_env_helper = true
end
```

So you can use things like:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
  }
end
```

For `ssm.long_env_helper = true`, it'll resolve to

    BUNDLE_GITHUB__COM: "SSM:/development/BUNDLE_GITHUB__COM"

And for `ssm.long_env_helper = false`, it'll resolve to

    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM"

The default is false.
