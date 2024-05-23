---
title: "Jets Job Enabling"
nav_text: Enable
category: jobs
order: 1
desc: How to Enable Jets Jobs.
---

To enable Jets Job you configure 2 things:

1. Jets SQS Queue and Lambda Worker: `config.job.enable = true`
2. Jets Job ActiveJob Adapter: `config.active_job.queue_adapter = :jets_job`

## Jets SQS Queue and Lambda Worker

A SQS Queue and Job Processor (Lambda) is created upon jets deployment.

{% include job/enable.md %}

## Jets Job IAM

When `config.job.enable = true`, Jets will automatically adds the necessary SQS IAM permission so that your Lambda functions can send messages to the SQS queue that Jets creates as part of deployment.

{% include reference/config/header.md %}
{% include reference/config/deploy/job.md %}
{% include reference/config/footer.md %}
