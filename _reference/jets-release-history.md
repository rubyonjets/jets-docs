---
title: jets release:history
reference: true
---

## Usage

    jets release:history

## Description

Release history

## Examples

    $ jets release:history
    Releases for stack: demo-dev
    +---------+-----------------+--------------+---------+
    | Version |     Status      | Released At  | Message |
    +---------+-----------------+--------------+---------+
    | 3       | UPDATE_COMPLETE | 10 hours ago | Deploy  |
    | 2       | UPDATE_COMPLETE | 18 hours ago | Deploy  |
    | 1       | UPDATE_COMPLETE | 22 hours ago | Deploy  |
    +---------+-----------------+--------------+---------+

The shown releases are paginated. If you need to see more releases you can use the `--page` option.

    $ jets release:history --page 2

## Other Commands

    release:info      View detailed information for a release


## Options

```
-l, [--limit=N]      # Per page limit
                     # Default: 10
-o, [--order=ORDER]  # Order: asc or desc
                     # Default: desc
-p, [--page=N]       # Page number
```

