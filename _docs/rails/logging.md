---
title: Rails Logging to Stdout
nav_text: Logging
category: rails
order: 5
---

Rails needs to log to stdout went running on AWS Lambda. Logs written to stdout end up in CloudWatch logs, and you get centralized logging baked in with `jets logs -f`.

## Logging Error

If you're seeing this error

> Rails Error: Unable to access log file. Please ensure that /app/log/production.log exists and is writable (i.e. make it writable for user and group: chmod 0664 /app/log/production.log). The log level has been raised to WARN and the output directed to STDERR until the problem is fixed.

This means that your Rails logger is configured to write to `log/production.log`. However, the AWS Lambda filesystem is [read-only]({% link _docs/more/considerations/ro-filesystem.md %}), so it errors.

## Solution

You should configure your logger to write to stdout instead of a file. Example:

config/environments/production.rb

```ruby
Rails.application.configure do
  if ENV["RAILS_LOG_TO_STDOUT"].present?
    logger           = ActiveSupport::Logger.new(STDOUT)
    logger.formatter = config.log_formatter
    config.logger    = ActiveSupport::TaggedLogging.new(logger)
  end
end
```

Note: The `jets init` generates a `config/jets/env/.env` with `RAILS_LOG_TO_STDOUT=1`. You can also remove the if check if you want.

