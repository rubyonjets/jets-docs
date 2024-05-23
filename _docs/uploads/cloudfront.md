---
title: "Jets CloudFront Uploads"
nav_text: CloudFront
category: uploads
order: 1
---

For Jets and Rails ActiveStorage, Jets can create a CloudFront CDN to serve the files uploaded by Rails ActiveStorage.

## How It Works

Here's an example of how it works.

    CloudFront Uploads Distribution -> Lambda Function URL -> Rails -> ActiveStorage S3

The CloudFront distribution will have a target origin of the "Lambda Function URL", which serves your Rails app.

Interestingly, ActiveStorage can be configured for S3 or any other storage. CloudFront only knows about the Lambda Function URL.

## Config

You can enable the creation of the Uploads CloudFront distribution with the following:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.uploads.cloudfront.enable = true
  config.uploads.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")
  # optional since a conventional alias is created
  # config.uploads.cloudfront.aliases = [
  #   "uploads-#{Jets.env}.example.com"
  # ]
  config.uploads.cloudfront.route53.enable = true
end
```

The CloudFront aliases config is optional since Jets create a convention CloudFront alias. It looks something like this:

    demo-dev-uploads.example.com

If `dns.enable = true`, then a route53 record is also created that matches the domain of the `cloudfront.cert.arn`.

## CDN For Rails ActiveStorage Uploads

**Important**: For the CloudFront CDN to work, you must use the ActiveStorage in `rails_storage_proxy` mode. Here's one way to configure it.

config/initializers/active_storage.rb

```ruby
Rails.application.config.active_storage.resolve_model_to_route = :rails_storage_proxy
```

Jets will also automatically configure a `JETS_UPLOAD_HOST` environment variable with the CloudFront endpoint. It will use the first value of `config.uploads.cloudfront.aliases` or the conventionally created alias.

So you can create a `cdn_image` route helper that will route to the CDN. Example:

config/route.rb

```ruby
Rails.application.routes.draw do
  direct :cdn_image do |model, options|
    expires_in = options.delete(:expires_in) { ActiveStorage.urls_expire_in }

    route_for_options = {
      host: ENV["JETS_UPLOAD_HOST"], # automatically set when creating Jets managed uploads cloudfront distribution
      port: ENV["JETS_UPLOAD_PORT"]  # only for development
    }

    if model.respond_to?(:signed_id)
      route_for(
        :rails_service_blob_proxy,
        model.signed_id(expires_in: expires_in),
        model.filename,
        options.merge(route_for_options)
      )
    else
      signed_blob_id = model.blob.signed_id(expires_in: expires_in)
      variation_key = model.variation.key
      filename = model.blob.filename

      route_for(
        :rails_blob_representation_proxy,
        signed_blob_id,
        variation_key,
        filename,
        options.merge(route_for_options)
      )
    end
  end
end
```

Here's an example of how you would use the helper in the views.

app/views/photos/show.html

```erb
<%= image_tag(@photo.image.variant(resize_to_limit: [300, 300])) %>
```

Rails Docs:

* [Rails Guide: Putting a CDN in Front of Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html#putting-a-cdn-in-front-of-active-storage)
* [Active Storage CDN with Cloudfront and Subdomain in Rails](https://mileswoodroffe.com/articles/active-storage-cloudfront-cdn-subdomain): This blog post does an excellent job of explaining the difference between Rails ActiveStorage redirect vs proxy mode. You must use proxy mode to use a CDN in front of ActiveStorage uploads.

## Tips

In general, CDNs like CloudFront cache content. This means errors may be cached if you have an error while setting your configuration. This can be confusing when debugging. Here are a few tips:

* Try adjusting the `cloudfront.default_cache_behavior.cache_policy_id = cloudfront_cache_policy_id("Managed-CachingDisabled")`, for debugging. Docs: [Using the managed cache policies
](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html#managed-cache-policy-caching-disabled)
* Browsers will cache images also. They simply follow the instructions for the cache headers. You can do a hard browser refresh request with `Shift-Command-R`. You can also use a private or incognito browser while testing.
* You can invalidate all CloudFront caches with: `aws cloudfront create-invalidation --distribution-id $DIST --paths '/*'`

{% include cloudfront/related.md %}

## Cache Control Header

With ActiveStorage, you can configure cache-control response header with:

config/storage.yml

```yaml
amazon:
  service: S3
  upload:
    cache_control: "private, max-age=<%= 1.day.to_i %>"
```

Note this is meta-data added to the s3 object. So if you want to change the cache-control, you must reupload the object.

For more info see [ActiveStorage Docs](https://edgeguides.rubyonrails.org/active_storage_overview.html#s3-service-amazon-s3-and-s3-compatible-apis)

{% include reference/config/header.md %}
{% include reference/config/deploy/lambda/cloudfront.md config_path="assets" %}
{% include reference/config/footer.md %}
