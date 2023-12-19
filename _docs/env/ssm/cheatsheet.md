---
title: SSM CLI Cheatsheet
nav_text: Cheatsheet
category: env-ssm
order: 2
---

Here's a SSM CLI cheatsheet.

## Create

To create a SSM parameter with the aws cli.

    aws ssm put-parameter --name /demo/dev/DATABASE_URL --type SecureString --value "mysql2://user:pass@db-1.ckbnyxs6b4a8.us-west-2.rds.amazonaws.com/demo_development?pool=5"

## Show

If you want to confirm that correct value.

    aws ssm get-parameters --names /demo/dev/DATABASE_URL --with-decryption | jq -r '.Parameters[].Value'

## List

List and filter ssm parameters.

    aws ssm describe-parameters | jq -r '.Parameters[].Name' | grep '/demo/dev/' | sort

To list with values:

    aws ssm get-parameters-by-path --path "/demo/dev/" | jq

## Delete

To delete.

    aws ssm delete-parameter --name /demo/dev/FOO

## Related

Also helpful are the `jets dotenv` subcommands:

    jets dotenv:list
    jets dotenv:get
    jets dotenv:set
    jets dotenv:unset

They can be used to set the SSM values more conveniently. Both the raw `aws ssm` commands and the `jets dotenv` commands are useful to get to know. It helpful to understand what's going on under-the-hood.
