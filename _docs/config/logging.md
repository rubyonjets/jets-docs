---
title: Logging
category: config
order: 3
---

## Formatter

The default logger foramtter does not prefix a timestamp. This is pretty much the default.

config/environments/development.rb

```ruby
Jets.application.configure do
  config.logger.formatter = ActiveSupport::Logger::SimpleFormatter.new
  config.logging.event = false # dont show large event in local development logging
end
```

The reason a timestamp is not prefix by default is that it makes for cleaner logging output locally. Remotely, on AWS lambda the `jets logs` command will include the timestamp already from the CloudWatch event item. So the timestamp is not needed.

That being said, if you want a timestamp to be prefixed, you can use this:

config/environments/development.rb

```ruby
Jets.application.configure do
  config.logger.formatter = Logger::Formatter.new # has timestamps
  config.logging.event = false # dont show large event in local development logging
end
```

The `config.logging.event` tells Jets whether or not to log the Lambda event payload. In development it's configured to false. In production, it's configured to true, so you can see it for debugging on Lambda.

## Request Logging Override

For controllers, all params and event payload will be logged to CloudWatch in every request along with a completion log with the status code and duration of the request. You can override each of these logs via the following:

Lambda request started:

```ruby
class ApplicationController < Jets::Controller::Base
  def log_start
    Jets.logger.info "Lambda function begin"
  end
end
```

Lambda request completed:

This function accepts a options parameter. The `options` value is a Hash with these keys:

* status: status code of the web request (ie. 200)
* took: web request's execution time.

```ruby
class ApplicationController < Jets::Controller::Base
  def log_finish(options={})
    status, took = options[:status], options[:took]
    Jets.logger.info "Web request complete, status code: #{status}, took: #{took}s"
  end
end
```

Note: The interface may change in the future.
