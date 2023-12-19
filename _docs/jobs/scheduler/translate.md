---
title: "Jets Job Scheduler Translate"
nav_text: Translate
category: jobs-scheduler
order: 1
---

Jets can translate a `conifg/sidekiq.yml` scheduler to a `config/jets/scheduler.yml`. There are two ways Jets can do this.

1. **Translate On Deploy**: The scheduler gets translated on-the-fly as part of `jets deploy`.
2. **Translate with CLI**: You translate it manually with the CLI and validate it looks good ahead of time.

It's recommended that option #2 be used to translate with CLI. The AWS Scheduled Rules expressions do not precisely match the sidekiq scheduler expressions. For example, there is a "seconds" field with sidekiq but not with Schedule Rules. Using approach #2 removes this ambiguity. Option #1 is provided as a convenience.

## Translate Upon Deploy

By default, if there is no `config/jets/schedule.yml` and `config/sidekiq.yml` exists **with** a `schedule` key, Jets will automatically translate the file upon deployment. You can configure this behavior with:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.scheduler.translate.on_deploy = true # default true
end
```

Note that the translated Scheduled Rules are also validated as part of the translation on `jets deploy`. This is done by creating a live test event rule for each translated entry in `config/jets/schedule.yml` and then deleting it.

Only sidekiq scheduler is supported.

## Translate with CLI

You can also use `jets schedule:translate` to translate the schedule instead of translating upon deployment.

 config/sidekiq.yml => config/jets/schedule.yml

You can then use `jets schedule:validate` to check whether the expressions are valid AWS CloudWatch Schedule Event Rules.

 jets schedule:translate
 jets schedule:validate

**Tip**: It also helps to use the [AWS EventBridge Console](https://us-west-2.console.aws.amazon.com/scheduler/home?#create-schedule) and pretend to create a Scheduled Rule. The form performs validation in real-time and allows you to familiarize yourself with the Schedule Rule expression syntax.

## Why Translate with the CLI?

There are differences between the sidekiq and CloudWatch rules scheduler syntax. For example, the "seconds" column is an extra column only in the sidekiq scheduler. Jets performs a best-effort translation. The advantage of translating the schedule instead of time instead of upon deployment is that you'll be able work with the syntax that matches the native CloudWatch Rules scheduler. Though the "on deploy" translation of `config/jets/schedule.yml` is provided as a convenience, it is recommended that the CLI be used to translate ahead of time.

**Note**: If both `config/sidekiq.yml` and `config/jets/schedule.yml` exist, the `config/jets/schedule.yml` takes higher precedence and is the only one used.
