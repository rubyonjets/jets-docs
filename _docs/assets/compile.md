---
title: "Assets Compile"
nav_text: Compile
category: assets
order: 4
---

When your app is running on AWS Lambda, the Jets helper methods like `stylesheet_link_tag`, `javascript_include_tag`, `javascript_importmap_tags`, `asset_path`, etc will point to the s3 bucket url. You can also configure settings so that the assets are served from a CDN like CloudFront that you manage yourself.

## Compile Config

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.assets.build.enable = true
  config.assets.build.precompile_command = "JETS_DOTENV=0 SECRET_KEY_BASE=dummy SECRET_KEY_BASE_DUMMY=1 bin/rails assets:precompile"
  config.assets.build.nodejs.enable = "auto"
  config.assets.build.nodejs.version = "20.12.1"

  config.assets.upload.enable = true
  config.assets.upload.folders = ["public"]
  config.assets.upload.cache_control = nil
  config.assets.upload.max_age = 3600
end
```

## Rails Asset Pipeline

There are two ways you can use the Rails asset pipeline with Jets.

1. Compiling assets locally.
2. Compiling assets during docker build.

It works similar to [Rails Asset Pipeline with Heroku](https://devcenter.heroku.com/articles/rails-asset-pipeline) with a few more configuration options.

### Compiling assets locally

If a `public/assets/manifest-*.js` is detected, Jets assumes that you have already precompiled assets yourself and will not attempt to compile assets.

**Advantage**: Compile assets locally before deployment may make sense if you have a complicated compiliation process and need more control over it. Additionally, compiling adds another 1m to the deploy overhead.  You can get compiling out of the deployment band and decide when compilation is necessary.

**Disadvantage**: It's one thing you have to do and take responsbility of. You need to install the toolchain and make sure it's consistent among developers or on a dedicated CI machine.

Note: It is important to not `.gitignore` or `.dockerignore` the `public/assets` folder if you want to use assets that you have compiled yourself. Otherwise, the files will not be present in the uploaded zip file to the remote runner. You can also use `config.code.always_keep`, see: [Code Zip]({% link _docs/docker/dockerfile/code-zip.md %}).

### Compiling assets remotely

When `public/assets/manifest-*.js` is not detected, Jets will compile assets by running the `bin/rails assets:precompile` command as part of the `docker build` process.

## Assets Upload

Jets will upload the assets files to s3 and configure JETS_ASSET_HOST to point to the s3 bucket so your Rails application can serve the assets out of s3, which is faster.

## NodeJS

As of Rails 7, nodejs is no longer required to compile assets. See: [Rails 7 will have three great answers to JavaScript in 2021+](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b). If you need nodejs, see: [Assets Nodejs]({% link _docs/assets/nodejs.md %})

{% include reference/config/header.md %}
{% include reference/config/deploy/assets.md %}
{% include reference/config/footer.md %}
