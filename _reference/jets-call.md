---
title: jets call
reference: true
---

## Usage

    jets call [options]

## Description

Call a lambda function on AWS or locally

## Remote mode

Invoke the lambda function on AWS.

## Examples

### Controller Examples

    jets call controller '{"path": "/up", "httpMethod": "GET"}' --show-logs | jq

You'll need to specify enough of the event payload so that the Jets shim handler can find the route and send it to the right controller action.

    jets call controller '{"path":"/posts"}' --show-logs | jq .
    jets call controller 'file://event.json' --show-logs | jq .

## Job Examples

    jets call cool_event-drive '{"test":1}'
    jets call cool_event-drive '{"test":1}' | jq .
    jets call cool_event-drive file://event.json | jq . # load event with a file


The equivalent AWS Lambda CLI command:

    aws lambda invoke --function-name demo-dev-cool_event-dig --payload '{"path":"/posts","test":1}' outfile.txt
    cat outfile.txt | jq '.'

Jets figures out what functions to call by evaluating the app code and finds if the class and method exists.  If you want to turn guess mode off and want to always explicitly provide the method name use the `--no-guess` option.  The function name will then have to match the lambda function without the namespace. Example:

    jets call controller --no-guess

If you want to call a function which runs too long time, you can set `read_timeout`.

    jets call some_long_job-index --read_timeout 900

And you can set `retry_limit`. If you don't want to retry you can set 0.

    jets call some_long_job-index --retry_limit 0

## Local mode

Instead of calling AWS lambda remote, you can also have `jets call` use the code directly on your machine.  To enable this, use the `--local` flag. Example:

    jets call cool_event-drive --local

## Logs

The `jets call` command can also print out the last 4KB of the lambda logs with the `--show-logs` option. The logging output is directed to stderr and the response output from the lambda function itself is directed to stdout so you can safely pipe the results of the call command to other tools like `jq`.


## Options

```
[--invocation-type=INVOCATION_TYPE]    # RequestResponse, Event, or DryRun
                                       # Default: RequestResponse
[--log-type=LOG_TYPE]                  # Works if invocation_type set to RequestResponse
                                       # Default: Tail
[--qualifier=QUALIFIER]                # Lambda function version or alias name
[--show-log], [--no-show-log]          # Shows last 4KB of log in the x-amz-log-result header
[--show-logs], [--no-show-logs]        # Shows last 4KB of log in the x-amz-log-result header
[--lambda-proxy], [--no-lambda-proxy]  # Enables automatic Lambda proxy transformation of the event payload
                                       # Default: true
[--guess], [--no-guess]                # Enables guess mode. Uses inference to allows use of all dashes to specify functions. Guess mode verifies that the function exists in the code base.
                                       # Default: true
[--local], [--no-local]                # Enables local mode. Instead of invoke the AWS Lambda function, the method gets called locally with current app code. With local mode guess mode is always used.
[--retry-limit=N]                      # Retry count of invoking function. It work with remote call
[--read-timeout=N]                     #  The number of seconds to wait for response data. It work with remote call
```

