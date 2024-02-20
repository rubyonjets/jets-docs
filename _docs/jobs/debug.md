---
title: "Jets Job Debugging Tips"
nav_text: Debug
category: jobs
order: 88
desc: Some debugging tips with Jets Jobs.
---

Here are some debugging tips with Jets Jobs.

## Adjust the Rate to 1 minute

config/jets/schedule.yml

```yaml
CleanupJob:
  rate: "1 minute"
```

## Finding the Lambda Function

    ❯ jets funs
    controller
    jets-prewarm_event-handle
    jets-queue_event-handle
    jets-schedule_event-cleanup_job

## Tailing Logs

    ❯ jets logs -f -n jets-schedule_event-cleanup_job
    START RequestId: e584923a-03d5-47f0-9a88-6a2138529086 Version: $LATEST
    Performing CleanupJob (Job ID: 21f668c5-a928-47fc-9973-f882ba2c68bf) from JetsJob(default)
    Cleaning up: []
    Performed CleanupJob (Job ID: 21f668c5-a928-47fc-9973-f882ba2c68bf) from JetsJob(default) in 0.61ms
