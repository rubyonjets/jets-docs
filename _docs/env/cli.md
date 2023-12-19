---
title: Jets Env CLI
nav_text: CLI
category: env
order: 5
---

You can use the `jets env` CLI commands to view and update your Lambda Function env vars.

**Important**: Changes with the `jets env` CLI command are outside a regular deployment. Think about `jets env` changes as "manual" changes. Running `jets deploy` may overwrite the changes.

If you add an environment variable that is not defined as part of the `jets deploy`, that environment variable may remain. It depends if you have changed any other env variable as a part of that deployment. Thus, you should not rely the temporary change being kept.  Also, if you entirely delete deployment and redeploy, CLI manually changes will be removed.

## Cheatsheet

    jets env:list
    jets env:get NAME1
    jets env:set NAME1=value1 NAME2=value2
    jets env:unset NAME1 NAME2

## Usage

List env vars:

    ❯ jets env:list
    Environment Variables for demo-dev
    JETS_ENV=dev
    JETS_S3_BUCKET=demo-dev-s3bucket-9bsdxjhvz0ps

Get env var:

    ❯ jets env:get NAME1
    value1

Set env vars:

    ❯ jets env:set NAME1=value1 NAME2=value2
    Will set env vars for demo-dev-controller
    Are you sure? (y/N) y
    Setting env vars for demo-dev-controller

Unset env vars:

    ❯ jets env:unset NAME1 NAME2
    Will unset env vars for demo-dev-controller
    Are you sure? (y/N) y
    Unsetting env vars for demo-dev-controller

## jets dotenv vs env

The `jets dotenv:list` and `jets env:list` commands may look similar but differ.

The `jets dotenv:list` parse your `config/jets/env` files, read SSM parameters, and show what env vars will ultimately be deployed your Lambda functions. In this sense, you can think about it as a "preview". You can change your SSM parameters and run `jets dotenv` to see what will be deployed.

The `jets env:list` command will show you what currently deployed env vars are **live** on your Lambda function. The `jets env` also contain subcommands like `get set unset` you can use to make changes to your Lambda Functions manually.
