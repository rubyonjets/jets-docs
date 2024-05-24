---
title: jets concurrency:info
reference: true
---

## Usage

    jets concurrency:info

## Description

Concurrency info

## Example

    ❯ jets concurrency:info
    Concurrency for demo-dev
    +---------------------------+----------+
    |         Function          | Reserved |
    +---------------------------+----------+
    | controller                | 25       |
    | jets-prewarm_event-handle | 2        |
    | total                     | 27       |
    +---------------------------+----------+
    Account Limits
      Concurrent Executions: 1000
      Unreserved Concurrent Executions: 730


## Options

```
[--format=FORMAT]  # Output format: csv, dotenv, equal, info, json, markdown, space, tab, table
                   # Default: table
```

