---
title: AWS Lambda Function Handler Errors
nav_text: Function Handler
category: debug
order: 1
---

The point of entry for AWS Lambda functions is always the configured "handler".  Jets configures the Jets Shim looks as the handler and it looks something like this:

handlers/controller.rb

```ruby
# Outside handler. Gets called once only during cold-start / boot.
Jets.shim.boot

def lambda_handler(event:, context:)
  # Inside the handler. Gets call on every invocation.
  Jets.shim.handler(event, context)
end
```

Errors can happen outside or inside the `lambda_handler`.

* Errors outside the handler can be tougher to track because AWS Lambda will not show the `stackTrace` as part of the invoke response. I'm guessing that AWS Lambda removes stack trace for security reasons.
* They do show up in the AWS Lambda Log though.

Here are some debugging tips if you're AWS Lambda does not seem to be working correctly.

## jets logs

Logs are you're friend.

    jets log -f

## jets exec

The jets exec REPL can be also used to see the errors.

    jets exec

With `jets exec` you can run commands as if you are in a bash shell within the AWS Lambda server to check whether your application is set up correctly.

## Rails Tips

Here are some additional Rails tips.

* Consider turning on `config.consider_all_requests_local = true`  turning this on temporarliy for production. This can be a security concern as it'll reveal your stack trace in the browser. If you are ok with it though, it can help. Again, you can see this same error with `jets log`.
* If the error is deep in some gem, you can try to remove the Rails backtrace cleaner. Put this
`Rails.backtrace_cleaner.remove_silencers!` in `config/initializers/backtrace.rb`.
