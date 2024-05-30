---
title: jets delete
reference: true
---

## Usage

    jets delete

## Description

Delete stack

Deletes the Jets deployment and all resources associated with it.

## Examples

    $ jets delete
    Deleting project...
    Are you sure you want to want to delete the 'demo-dev' project? (y/N)
    y
    Emptying s3 bucket demo-dev-s3bucket-89jrrj60c7bj
    Deleting demo-dev...
    05:14:09AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    ...
    05:14:23AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack PostsController
    05:15:31AM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    Stack demo-dev deleted.
    Time took for deletion: 1m 27s.
    Project demo-dev deleted!
    $

You can bypass the are you sure prompt with the `-y` flag.

    $ jets delete --y


## Options

```
-y, [--yes], [--no-yes], [--skip-yes]  # Skip are you sure prompt
```

