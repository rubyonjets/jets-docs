---
title: Events Project
nav_text: Events
category: learn
subcategory: learn-events
order: 8
---

In this guide, we'll show how Jets can be used to run Lambda functions based on event triggers.

You simply write code and have Lambda run it for you based on a scheduled event or an event like SNS, SQS, and [more]({% link _docs/events.md %}). If the use case fits, it is fantastic. It is one of my favorite ways to use Jets.

Note: AWS Lambda functions have a maximum 15-minute timeout. See [Lambda quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html). Please consider that limitation.

{% assign event_docs = site.docs | where: "categories","learn-events" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
