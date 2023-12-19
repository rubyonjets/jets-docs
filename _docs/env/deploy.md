---
title: Jets Env Deploy
nav_text: Deploy
category: env
order: 2
---

When you run `jets deploy`, Jets packages up your code and uploads it to s3 for deployment.

## Gitignore Files

Jets uses `git archive` to create the `code.zip`. This is nice because keeps the zip small and it also respects `.gitignore` rules. Typically `.env` files are gitignored. So, the deployed Lambda Function will not have these env vars.

## jets/config/env

If you want to use env files for the Lambda Function, you can use `config/jets/env` files. Example:

    config/jets/env/.env

Jets Dotenv support adds additional features like [referencing SSM Parameters]({% link _docs/env/ssm.md %}). Example:

config/jets/env/.env

    DATABASE_URL=SSM:/demo/dev/DATABASE_URL

This allows you to safely commit `config/jets/env` files to version control.

{% include env/conventional-path.md %}

## always_keep config

When `jets deploy` runs, the `config/jets/env` files are always copied to the code.zip. This is thanks to the `copy.always_keep` default.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.code.copy.always_keep = ["config/jets/env"] # default
end
```

Note: The `config/jets/env` files must exist to be copied. IE: They may not for CI.

{% include ci/gitignore.md %}