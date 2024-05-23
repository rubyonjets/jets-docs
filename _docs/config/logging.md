---
title: Logging
category: config
order: 11
---

When your app is deployed to AWS Lambda, logging to stdout logs are sent to CloudWatch logs. You can configure the log verbosity level Lambda writes to CloudWatch logs. These are the Jets defaults.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.logging_config = {
    ApplicationLogLevel: "INFO",
    LogFormat: "JSON", # Text | JSON
    SystemLogLevel: "WARN"
  }
end
```

**Important**: To set log levels, you must use `LogFormat: "JSON"`.

* Application Log Levels: TRACE DEBUG INFO WARN ERROR FATAL
* System Log Levels: DEBUG INFO WARN

The System WARN level removes initStart, runtimeDone, report logs which usually look like this

    START RequestId: aef5f99f-3eea-4963-bc17-02717248a83f Version: $LATEST
    ...
    END RequestId: aef5f99f-3eea-4963-bc17-02717248a83f
    REPORT RequestId: aef5f99f-3eea-4963-bc17-02717248a83f Duration: 9.69 ms Billed Duration: 10 ms Memory Size: 1536 MB Max Memory Used: 405 MB

To reset it to default AWS Lambda logging behavior, use:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.logging_config = {
    LogFormat: "Text",
  }
end
```

Note, you cannot set log levels when using `LogFormat: "Text"`.


Related:

* [CloudFormation Lambda Function LoggingConfig](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-lambda-function-loggingconfig.html): The config map to the CloudFormation properties.
* [Log Level Filtering](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html#monitoring-cloudwatchlogs-log-level): You can set different log levels for the `ApplicationLogLevel` and `SystemLogLevel`.
* [System log level event mapping](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-cloudwatchlogs.html#monitoring-cloudwatchlogs-log-level-mapping): initStart, runtimeDone, report, etc

## Prewarm Logging

When using `LogFormat: "Text"`, prewarming requests can add noise to the logs.

If you want to see the noisy prewarming logs.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.logging_config = {
    LogFormat: "Text",
  }
  config.prewarm.quiet = false
end
```

The prewarming request logs then look like this

    $ jets logs -f
    START RequestId: aef5f99f-3eea-4963-bc17-02717248a83f Version: $LATEST
    Prewarm request: {"boot_at":"2024-04-26 02:00:36 UTC","gid":"7ac4ad98","prewarm_at":"2024-04-26 02:17:59 UTC","prewarm_count":18}
    END RequestId: aef5f99f-3eea-4963-bc17-02717248a83f
    REPORT RequestId: aef5f99f-3eea-4963-bc17-02717248a83f Duration: 9.69 ms Billed Duration: 10 ms Memory Size: 1536 MB Max Memory Used: 405 MB

## Rails Logging Format

The Rails logging format includes it's own timestamp and process info.

    $ jets logs -f
    I, [2024-04-26T03:14:22.572735 #9] INFO -- : [a989a1f7-7f83-4984-bf52-dd86d9c96c0c] Started GET "/" for 66.234.208.210 at 2024-04-26 03:14:22 +0000
    I, [2024-04-26T03:14:22.573489 #9] INFO -- : [a989a1f7-7f83-4984-bf52-dd86d9c96c0c] Processing by ApplicationController#home as HTML
    I, [2024-04-26T03:14:22.776744 #9] INFO -- : [a989a1f7-7f83-4984-bf52-dd86d9c96c0c] Completed 200 OK in 203ms (Views: 118.3ms | ActiveRecord: 79.6ms | Allocations: 52194)

If you want to remove Rails timestamp and pid

config/environments/production.rb

```ruby
Rails.application.configure do
  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new

  # Uncomment to also remove the id hash, but SimpleFormatter strips the leading spaces
  # logger = ActiveSupport::Logger.new(STDOUT)
  # logger.formatter = ActiveSupport::Logger::SimpleFormatter.new
  # config.logger = logger
end
```
