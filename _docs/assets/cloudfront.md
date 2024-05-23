---
title: "Jets Assets CloudFront"
nav_text: CloudFront
category: assets
order: 4
---

Jets can create a CloudFront distribution and use it to serve your assets that Jets uploads to s3. Using a CloudFront CDN is recommended.

Though serving assets from S3 is leaps and bounds better than serving them from Lambda, using a CloudFront CDN is even better. CDNs are designed for this very purpose. Your users will have a better experience since the CDN edge locations are closer to them.

To enable:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.assets.cloudfront.enable = true
  config.assets.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")
  config.assets.cloudfront.route53.enable = true
  # config.assets.cloudfront.aliases = %w[
  #   assets0.example.com
  #   assets1.example.com
  #   assets2.example.com
  #   assets3.example.com
  # ]
end
```

Note, when `config.assets.cloudfront.aliases` is overrides conventional aliases. The conventional aliases would look like this.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.assets.cloudfront.aliases = %w[
    demo-dev-assets0.example.com
    demo-dev-assets1.example.com
    demo-dev-assets2.example.com
    demo-dev-assets3.example.com
  ]
end
```

It is assumed that you do not want the conventional aliases when you explicitly set aliases.

## Multiple Hosts

By default, Jets will create multiple hosts from `demo-dev-assets0.example.com` to `demo-dev-assets3.example.com` to serve assets. This is catered to the Rails Asset hosts handling. See: [ActionView AssetUrlHelper](https://api.rubyonrails.org/classes/ActionView/Helpers/AssetUrlHelper.html)

> You can use the %d wildcard in the asset_host to distribute the requests over four hosts.

## Expiring CloudFront Caches

On initial creation of the Assets, CloudFront Distribution assets may appear "missing". This can happen if Route53 does not manage the DNS and Jets cannot automate the DNS record creation. If requests hit CloudFront before you're done manually setting up the DNS entries on your side, then the CloudFront requests may cache "missing" assets. In this case, you need to expire the caches. Here's a cheat sheet command.

    DIST=E1NL288EXAMPLE
    aws cloudfront create-invalidation --distribution-id $DIST --paths '/*'

{% include cloudfront/related.md %}

{% include reference/config/header.md %}
{% include reference/config/deploy/lambda/cloudfront.md config_path="assets" %}
{% include reference/config/footer.md %}
