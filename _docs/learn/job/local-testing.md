---
title: Local Testing
search_title: Local Testing Project Job
category: learn-job
order: 5
---

{% include videos/learn/getting-started/job.md %}

You can test the job locally with `jets console`. Example:

    ❯ jets console
    > HardJob.perform_now(:perform)
    Do something with event {}

A second argument can be passed to as the event payload. Example:

    ❯ jets console
    > HardJob.perform_now(:perform, {foo: "bar"})
    Do something with event {"foo"=>"bar"}

You can use the second argument to mock test event payloads. There's not much useful information in a Schedule Event payload, other [Events]({% link _docs/events.md %}) can have more useful information.

Next, we'll deploy the project to AWS Lambda.
