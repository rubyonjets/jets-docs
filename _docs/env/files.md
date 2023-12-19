---
title: Jets Dotenv Files
nav_text: Files
category: env
order: 1
---

Jets supports dotenv files. Jets uses dotenv files in the `config/jets/env` folder **only** for the AWS Lambda Function environment variables.

**Note**: Jets 6, dotenv files support work differently from Jets 5 since Jets 6 allows you to Bring Your Own Framework. Jets env files designed only for deployment. Also, the `JETS_ENV_REMOTE` concept has been removed.

## How It Works

Here's an example to show how it works.

    .env
    config/jets/env/.env

A framework like Rails using the [dotenv](https://github.com/bkeepers/dotenv) library loads the `.env` file. That is used locally only. Usually, these `.env` files are gitignored and not checked into version control.

The Jets `config/jets/env` files like `config/jets/env/.env` will be used by Jets and their env values will be assigned to the AWS Lambda Function environment variables.

## Environment Specific Variables

You can set environment specific variables for Let's say you have a Jets project with the following dotenv files:

    config/jets/env/.env
    config/jets/env/.env.dev
    config/jets/env/.env.prod

The `.env` file is always loaded. The other `.env` files will be loaded based on the value of the `JETS_ENV` value. So:

* `JETS_ENV=dev jets deploy` uses `config/jets/env/.env.dev`
* `JETS_ENV=prod jets deploy` uses `config/jets/env/.env.prod`

Though you can use separate env files, you can keep things even simpler by using [SSM]({% link _docs/env/ssm.md %}) and conventions in the `.env` file.

{% include env/conventional-path.md %}

## Dotenv File Precedence

The naming convention for these files is .env.<ENVIRONMENT>. Here's an example with `JETS_ENV=dev` to explain the dotenv files precedence, from highest to lowest.

1. config/jets/env/.env.dev.beta (highest) - Loaded when `JETS_EXTRA=beta` is set
4. config/jets/env/.env.dev
5. config/jets/env/.env - (lowest) - Always loaded

## Command: jets dotenv:list

You can use the `jets dotenv:list` command to show the resolved values. This can be useful for debugging.

    ❯ jets dotenv:list
    DATABASE_URL=mysql2://user:pass@host.com/dbname?pool=5

## Function Env Variables

The `config/jets/env` names and values are added to the Lambda Function Env Variables as part of deployment. Related: [SSM Design Thoughts]({% link _docs/env/ssm/thoughts.md %}).
