---
title: Rails Env vs Jets Env
nav_text: Env Vs
category: rails
order: 10
---

We'll cover the difference between `RAILS_ENV` and `JETS_ENV` and how they should be used.

## Short vs Long Names

Jets 6 and above uses shows short env names for `JETS_ENV`. Examples:

    JETS_ENV=dev
    JETS_ENV=prod

`RAILS_ENV` is a separate thing and uses long names. Examples:

    RAILS_ENV=development
    RAILS_ENV=production

## Deploying

When you deploy, `JETS_ENV=dev` is the default.

    jets deploy # same as JETS_ENV=dev jets deploy

To deploy a production version of your site

    JETS_ENV=prod jets deploy

Intesresting in both cases, `RAILS_ENV=production`. Your `RAILS_ENV` should always be `RAILS_ENV=production` and set in:

config/jets/env/.env

    RAILS_ENV=production

This is because `RAILS_ENV=development` will not work when on AWS Lambda.  The reasons:

* AWS Lambda has a read-only filesystem. Rails in development mode will do things like create folders and files and it won't work on a read-only filesystem.
* Rails development mode is really designed for you local machine and will do things like hot reloading etc. When running on AWS Lambda these things won't work well.
* When running on AWS Lambda, `RAILS_ENV=production` settings should always be used.
* If you need to have different behaviors depending on development vs production, you can check `Jets.env == "dev"` or `Jets.env == "prod"` instead.
