---
title: Dockerfile Assets
nav_text: Assets
category: dockerfile
order: 3
---

For Rails, Within the `docker build` command assets precompiled. Assets are copied out of the `docker build` image and uploaded to s3 for asset serving.

## config asset_host

To configure the Rails app to serve the assets from the Jets managed s3 bucket.

config/environments/production.rb

```ruby
Rails.application.configure do
  config.asset_host = ENV['JETS_ASSET_HOST']
end
```

The `JETS_ASSET_HOST` is automatically set as part of the `jets deploy` process. It points to the jets s3 bucket with under the `jets/public` path where the assets are uploaded to, IE: https://demo-dev-s3bucket-5lfgasr90ldd.s3.us-west-2.amazonaws.com/jets/public

## Disabling Assets Uploading

If for some reason, you want to disable asset serving from S3.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.assets.enable = false
end
```
