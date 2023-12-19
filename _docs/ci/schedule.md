---
title: Jets CI Schedule
nav_text: Schedule
category: ci
order: 4
---

You can configure a schedule for to CI to run on a scheduled basis. It's useful to deploy daily as a sanity check to ensure that everything works and continues to work.

Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ci.schedule.enable = true
  config.ci.schedule.rate = "1d"
end
```

Underneath the hood, the rate format gets translated with [fugit](https://github.com/floraison/fugit) to the AWS CloudWatch Scheduled Event Rule format: [rate](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html).

You can also use the [cron](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html) syntax. Note, the AWS Cron syntax is slightly different from the Linux cron syntax.

## Cheatsheet

Here's a reference cheatsheet of examples:

```ruby
config.ci.schedule.rate = "1d"
config.ci.schedule.cron = "0 */12 * * ? *"
config.ci.schedule.expression = "rate(1 hour)"
```
