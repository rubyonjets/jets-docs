---
title: Job Project
category: learn
subcategory: learn-job
order: 1
---

Jets can be use to run simple jobs on Lambda. Instead of a cron job, you simply write  code and have Lambda run it for you based on a schedule or an event like SNS, SQS, and [more]({% link _docs/events.md %}). If the use-case fits, it fantastic. It is one of my favorite ways to use Jets.

Note: AWS Lambda functions have a maximum 15 minute timeout. See [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html). So please consider that limitation.

{% assign event_docs = site.docs | where: "categories","learn-job" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
