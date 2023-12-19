---
title: Jets Release History
nav_text: Jets Release
category: debug
order: 3
---

The `jets release` commands allow you to view `jets deploy` history. You can use it to rollback code if needed.

Example:

    $ jets release:history
    Releases for stack: demo-dev
    +---------+-----------------+--------------+---------+
    | Version |     Status      | Released At  | Message |
    +---------+-----------------+--------------+---------+
    | 3       | UPDATE_COMPLETE | 10 hours ago | Deploy  |
    | 2       | UPDATE_COMPLETE | 18 hours ago | Deploy  |
    | 1       | UPDATE_COMPLETE | 22 hours ago | Deploy  |
    +---------+-----------------+--------------+---------+

## Rollback

To rollback, provide the version number.

    jets rollback 2

This rolls back to version 2.

