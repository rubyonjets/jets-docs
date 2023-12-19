---
title: Lambda URL CloudFront Access Logs
nav_text: Access Logs
category: routing-lambda-cloudfront-archive
order: 10
---

You can enable Access Logs the CloudFront Distribution.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.logging.enable = true # default false
  # config.lambda.url.cloudfront.logging.prefix = "cloudfront"
end
```

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.s3_bucket.acls = %w[LogReadWrite] # needed for cloudfront log delivery
end
```

