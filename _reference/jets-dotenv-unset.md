---
title: jets dotenv:unset
reference: true
---

## Usage

    jets dotenv:unset NAMES

## Description

Unset SSM env vars for function

## Example

    ❯ jets dotenv:unset NAME1 NAME2
    Will delete the SSM vars for demo-dev

      /demo/dev/NAME1
      /demo/dev/NAME2

    Are you sure? (y/N) y
    Setting SSM vars for demo-dev
    SSM Parameter deleted: /demo/dev/NAME1
    SSM Parameter deleted: /demo/dev/NAME2


## Options

```
-y, [--yes], [--no-yes], [--skip-yes]  # Skip are you sure prompt
```

