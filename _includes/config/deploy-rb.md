The `deploy.rb` contains the most options and will be the settings you'll likely adjust most. It tells the Jets [Remote Runner]({% link _docs/remote/codebuild.md %}) how to build and deploy your project to Serverless AWS Lambda. Here's a starter example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  # Scaling https://docs.rubyonjets.com/docs/config/concurrency/
  config.lambda.controller.provisioned_concurrency = 1  # costs money, always running lambda
  config.lambda.controller.reserved_concurrency = 25    # free and limits scaling

  # CloudFront Lambda URL https://docs.rubyonjets.com/docs/routing/lambda/cloudfront/distribution/
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert.arn = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.route53.enable = true

  # Release phase https://docs.rubyonjets.com/docs/hooks/remote/release/
  config.release.phase.command = "bundle exec rails db:migrate"
end
```
