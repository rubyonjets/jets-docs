---
title: Env Deployment
category: env
order: 2
---

When you run `jets deploy`, Jets zips up your code and uploads it to s3 for deployment.

## Gitignore Files

The Jets `code.zip` file will not contain files in `.gitignore`. Typically, `.env` files are ignored.

If you have `.env` files with required values, the deployed Lambda Function will not have them. Here are some ways to address this.

## jets/config/env

The recommended way is to leave your `.gitignore` as-is and add additional `config/jets/env` files for deployment. Example:

    config/jets/env/.env
    config/jets/env/.env.production

The jets dotenv files support additional features like [referencing SSM Parameters]({% link _docs/env/ssm.md %}). Example:

config/jets/env/.env.production

    DATABASE_URL=SSM:/demo/production/DATABASE_URL

This allows you to safely commit `config/jets/env` files to version control. The values in these files also appear in the Lambda Function Environment Variables, making debugging easier.

## always keep config

Another approach is to configure the bootstrap to copy `.env` files. Here's an example:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.code.always_keep = [".env"]
end
```

This will also deploy the `.env` files. The framework dotenv load mechanism will load the value accordingly.