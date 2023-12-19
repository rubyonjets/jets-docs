---
title: Jets NewRelic Monitoring on AWS Lambda
nav_text: NewRelic
category: monitoring
order: 8
---

If you're using [NewRelic](https://newrelic.com/) for APM monitoring on AWS Lambda, you need to add `log_file_path: 'STDOUT'` to your `newrelic.yml` file. This is because AWS Lambda is a [read-only filesystem]({% link _docs/more/considerations/ro-filesystem.md %}).

newrelic.yml

```yaml
common: &default_settings
  # Required license key (this is an example key, replace it with your actual key)
  license_key: 'YOUR_NEW_RELIC_LICENSE_KEY'

  # Application name
  app_name: 'Demo'

  # Logging configuration
  log_level: info
  log_file_path: STDOUT

development:
  <<: *default_settings

test:
  <<: *default_settings

production:
  <<: *default_settings
```

Here's a more comprehensive example [newrelic.yml](https://github.com/newrelic/newrelic-ruby-agent/blob/dev/newrelic.yml) from [newrelic/newrelic-ruby-agent](https://github.com/newrelic/newrelic-ruby-agent)
