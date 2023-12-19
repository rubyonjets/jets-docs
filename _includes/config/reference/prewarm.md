prewarm.cron | nil | When set takes higher precedence than rate.
prewarm.reserved_concurrency | 2 | The reserved concurrency for the prewarm Lambda Function. Not a lot is needed because only it gets called a controlled scheduled interval and post deployment.
prewarm.enable | true | Enables prewarming.
prewarm.memory | 1024 | Memory setting for the prewarm event.
prewarm.rate | 5m | A rate expression. Both `5 minutes` and `5m` work. See: [AWS Scheduled Rate Expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html) and [fugit](https://github.com/floraison/fugit)
prewarm.threads | 10 | Number of threads to send at the same time to prewarm the controller Lambda function. `prewarm.threads` should be less than or equal to `lambda.controller.reserved_concurrency`.
prewarm.timeout | 5m | Timeout of the prewarm event.