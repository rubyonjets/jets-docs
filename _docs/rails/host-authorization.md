---
title: Jets Rails Host Authorization
nav_text: Host Authorization
category: rails
order: 8
---

In older versions of Rails, you need to explicitly allow hosts when `RAILS_ENV=production`. This PR changes that behavior: [Github rails: Only use HostAuthorization if configured #46858](https://github.com/rails/rails/pull/46858)

## Enable Host Authorization

If you want to enable host authorization anyway, here's an example.

config/application.rb

```ruby
module Demo
 class Application < Rails::Application
 # config.hosts only used if set. If it's empty HostAuthorization is not checked
 config.hosts += [/.*\.amazonaws\.com/, /.*\.on\.aws/, "example.com", /.*\.example\.com/]
 end
end
```

## CloudFront Distribution

With a [CloudFront Distribution]({% link _docs/routing/lambda/cloudfront/distribution.md %}) in front of the Lambda Function URL, it already does host checking. Only hosts that are part of the CloudFront aliases lists and verified with an ACM cert will be allowed. So, the Rails Host Authorization check may be extra debugging overhead.
