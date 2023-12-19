---
title: Jets Exec for Debugging
nav_text: Jets Exec
category: debug
order: 3
---

The `jets exec` command can be useful for debugging. It provides an REPL that allows you to send bash commands to the AWS Lambda deployed environment.

Here's an example:

    ❯ jets exec
    Jets REPL (6.0.0). Commands will be executed on Lambda.
    Lambda function: demo-dev-controller
    Type 'help' for help, 'exit' to exit.
    $ help
    Available commands:
      - history [n or 'all']: Display the last n commands or the all command history. (Default: 20)
      - status: Display the status of the last command executed on Lambda.
      - result or _: Show previous command result.
      - help: Display this help message.
      - !<number>: Execute the command from the history by number.
      - exit: Exit the REPL. You can also use Control-D.
    $ pwd
    /app
    $ whoami
    sbx_user1051
    $ uname -a
    Linux 169.254.38.21 5.10.215-223.850.amzn2.aarch64 #1 SMP Tue Apr 30 23:20:57 UTC 2024 aarch64 GNU/Linux
    $ ls config/jets/project.rb
    config/jets/project.rb
