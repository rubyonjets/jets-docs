---
title: Lambda URL CloudFront Origin Host
nav_text: Origin Host
category: routing-lambda-cloudfront
order: 88
---

## CloudFront Function

Jets creates a [CloudFront Function](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-function.html#aws-resource-cloudfront-function-return-values) as part of the [CloudFront Distribution]({% link _docs/routing/lambda/cloudfront/distribution.md %}).  This function sets an Origin host header.

This allows your app to see the host used by the user.

    CloudFront      -> Lambda URL                      -> Rails App
    demo.domain.com -> abc.lambda-url.us-west-2.on.aws -> Your App

The Rails app will see demo.domain.com. Whatever `cloudfront.aliases` you configure is what the Rails app sees. Multiple CloudFront aliases also work.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  # config.lambda.url.cloudfront.function.enable = true # default: true
  config.lambda.url.cloudfront.aliases = [
    "demo.example.com",
    "demo2.domain.com
  ]
  config.lambda.url.cloudfront.route53.enable = true
end
```

If you are using Route53 to manage the DNS, than you can have Jets automatically also add the [Route53 DNS record]({% link _docs/routing/lambda/cloudfront/route53.md %}).

## JETS_SHIM_HOST

If you turn off the CloudFront function, then Jets will set the `JETS_SHIM_HOST` env variable with the first CloudFront aliases item in `config.lambda.url.cloudfront.aliases = ["name1.example.com", "name2.example.com"]` and sets it as the `JETS_SHIM_HOST` env var, IE: `JETS_SHIM_HOST = "name1.example.com"`. The Jets Shim will use `JETS_SHIM_HOST` when set instead of the Lambda URL.  This also means that only **one** host can be used. It's the first of `config.lambda.url.cloudfront.aliases`.

The `JETS_SHIM_HOST` env var override can also be useful if your own manually managed CloudFront distribution in front your Jets app.

## Rails config.hosts

Remember, for Rails, you'll need to set `config.hosts` to allow for the host. Example:

```ruby
module Demo
  class Application < Rails::Application
    config.hosts += [/.*\.amazonaws\.com/, /.*\.on\.aws/, "demo.example.com", "demo2.example.com"]
  # ...
```

Otherwise you'll get a Rails `HostAuthorization` error. Example:

    START RequestId: b6614a37-2f42-4cde-87a3-c913a91583a4 Version: $LATEST
    E, [2024-04-14T03:20:33.825228 #8] ERROR -- : [ActionDispatch::HostAuthorization::DefaultResponseApp] Blocked hosts: demo.dev.boltops.com
    END RequestId: b6614a37-2f42-4cde-87a3-c913a91583a4
    REPORT RequestId: b6614a37-2f42-4cde-87a3-c913a91583a4  Duration: 3.45 ms       Billed Duration: 4 ms   Memory Size: 1536 MB    Max Memory Used: 347 MB

## CloudFront Host Note

Normally, with CloudFront, your app only sees the Lambda URL. For example:

    CloudFront      -> Lambda URL                      -> Rails App
    demo.domain.com -> abc.lambda-url.us-west-2.on.aws -> Your App

CloudFront does not forward any host info to the headers to the Origin. Thus Rails apps only sees the Lambda URL `abc.lambda-url.us-west-2.on.aws` not the CloudFront `demo.domain.com`.

Jets addresses the issue with a CloudFront Function or JETS_SHIM_HOST, as noted previously.