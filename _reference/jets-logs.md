---
title: jets logs
reference: true
---

## Usage

    jets logs

## Description

Tail the logs

Show logs from Lambda function CloudWatch log group.

This defaults to the controller Lambda function.  Example:

    ❯ jets logs
    Showing logs for /aws/lambda/demo-dev-controller

If you want to follow the logs use the `-f` flag.

    ❯ jets logs -f
    Tailing logs for /aws/lambda/demo-dev-controller

If you want to see the production logs:

    ❯ JETS_ENV=prod jets logs -f
    Tailing logs for /aws/lambda/demo-prod-controller

If you want to see logs for a job, specify the job and method.

    ❯ jets logs -f -n hard_job-dig
    Tailing logs for /aws/lambda/demo-dev-hard_job-dig


## Options

```
    [--since=SINCE]                                            # From what time to begin displaying logs.  By default, logs will be displayed starting from 10m in the past. The value provided can be an ISO 8601 timestamp or a relative time. Examples: 10m 2d 2w
-f, [--follow], [--no-follow], [--skip-follow]                 #  Whether to continuously poll for new logs. To exit from this mode, use Control-C.
                                                               # Default: false
    [--format=FORMAT]                                          # The format to display the logs. IE: detailed, short, plain.  For plain, no timestamp are shown.
                                                               # Default: plain
    [--filter-pattern=FILTER_PATTERN]                          # The filter pattern to use. If not provided, all the events are matched
-n, [--log-group-name=LOG_GROUP_NAME]                          # The log group name.  Default: /aws/lambda/NAMESPACE-controller
    [--refresh-rate=N]                                         # How often to refresh the logs in seconds.
                                                               # Default: 1
    [--wait-exists], [--no-wait-exists], [--skip-wait-exists]  # Whether to wait until the log group exists.  By default, it will wait.
                                                               # Default: true
```

