  # CloudFront Lambda URL https://docs.rubyonjets.com/docs/routing/lambda/cloudfront/distribution/
  # config.lambda.url.cloudfront.enable = true
  # config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "domain.com", region: "us-east-1")
  # config.lambda.url.cloudfront.route53.enable = true

  # CloudFront Assets
  # config.assets.cloudfront.enable = true
  # config.assets.cloudfront.cert.arn = acm_cert_arn(domain: "domain.com", region: "us-east-1")
  # config.assets.cloudfront.route53.enable = true

  # Release phase https://docs.rubyonjets.com/docs/hooks/remote/release/
  # config.release.phase.command = "bundle exec rails db:migrate"

  # Scaling https://docs.rubyonjets.com/docs/config/concurrency/
  # config.lambda.controller.provisioned_concurrency = 1  # costs money, no cold start
  # config.lambda.controller.reserved_concurrency = 25    # free and limits scaling

  # IAM https://docs.rubyonjets.com/docs/iam/app/iam-policies/
  # config.lambda.iam.policy = ["sns"]
  # config.lambda.iam.managed_policy = ["AmazonS3FullAccess"]

  # Docker https://docs.rubyonjets.com/docs/docker/dockerfile/managed/
  # config.dockerfile.packages.apt.build_stage = ["default-libmysqlclient-dev"]
  # config.dockerfile.packages.apt.deployment_stage = ["default-mysql-client"]

  # https://docs.rubyonjets.com/docs/config/package-type/