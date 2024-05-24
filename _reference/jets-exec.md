---
title: jets exec
reference: true
---

## Usage

    jets exec

## Description

REPL or execute commands on AWS Lambda

Execute commands on AWS Lambda environment.

## REPL

When no command is provided a REPL is started.

    ❯ jets exec
    > pwd
    /var/task
    > whoami
    sbx_user1051
    > echo $AWS_REGION
    us-west-2
    > env | sort

More examples:

    ❯ jets exec
    > env | sort
    > cat /etc/os-release
    > du -sh * | sort -sh

## Execute Commands

    ❯ jets exec uname -a
    Linux ... GNU/Linux

## Status and Result

You can see the status and result of the last command executed on AWS Lambda. Example:

    ❯ jets exec
    > whoami
    sbx_user1051
    > status
    Last command had a status of success (0).
    > result
    Last result:
    {
      "stdout": "sbx_user1051\n",
      "stderr": "",
      "status": 0
    }
    > echo "This is an error message" >&2
    This is an error message
    > result
    Last result:
    {
      "stdout": "",
      "stderr": "This is an error message\n",
      "status": 0
    }
    >


## Options

```
-n, [--function=FUNCTION]                          # Lambda Function name
                                                   # Default: controller
-v, [--verbose], [--no-verbose], [--skip-verbose]  # Show more verbose logging output. Useful for debugging what's under the hood
                                                   # Default: false
```

