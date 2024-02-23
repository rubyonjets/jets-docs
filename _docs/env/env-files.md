---
title: Dotenv Files
category: env
order: 1
---

Jets supports loading env variable values from dotenv files. Jets loads the dotenv files from the `config/jets/env` folder.

Since other frameworks usually already support their down dotenv load mechanism, Jets does not interfere with that and only adds supplemental dotenv locations and features. Framework dotenv files will always take higher precedence than jets dotenv files.

**Note**: Jets 6, dotenv files support work slightly differently from Jets 5 since Jets 6 allows you to Bring Your Own Framework. Also, the `JETS_ENV_REMOTE` concept has been removed.

## How It Works

Here's an example to show how it works.

    .env
    config/jets/env/.env

A framework like Rails using the [dotenv](https://github.com/bkeepers/dotenv) library loads the `.env` file. Jets then loads the `config/jets/env/.env`. Any values in the first top-level `.env` file by the framework takes higher precedence than any values in the `config/jets/env/.env` file. Jets plays nicely with other frameworks.

Similiarly, any env values at the host takes higher precedence. IE: If you explicitly set an env var like `RAILS_ENV=production rails console`, the CLI env var always win. It is assumed that host or deployment environment has more knowledge about configuration than the application does.

## Environment Specific Variables

Let's say you have a Jets project with the following dotenv files:

    config/jets/env/.env
    config/jets/env/.env.development
    config/jets/env/.env.production

The `.env` file is always loaded. The other `.env` files will be loaded based on the value of the `JETS_ENV` environment variable in the machine you're deploying from. So:

* `JETS_ENV=development jets deploy` will use `config/jets/env/.env.development`
* `JETS_ENV=production jets deploy` will use `config/jets/env/.env.production`

## Jets Extra

The [JETS_EXTRA]({% link _docs/env/env-extra.md %}) concept supports its own dotenv file.  Example:

    JETS_EXTRA=beta jets console

Loads `config/jets/env/.env.development.beta`. This takes the highest precedence over other dotenv files.

## Dotenv File Precedence

The naming convention for these files is .env.<ENVIRONMENT>. Here's an example with `JETS_ENV=development` to explain the dotenv files precedence, from highest to lowest.

1. config/jets/env/.env.development.beta (highest) - Loaded when `JETS_EXTRA=beta` is set
2. config/jets/env/.env.development.local
3. config/jets/env/.env.local - Loaded for all environments _except_ `test`.
4. config/jets/env/.env.development
5. config/jets/env/.env - (lowest) - Always loaded

