---
title: Events
---

Jets is also a powerful Glue Serverless Framework.

AWS Lambda supports many event triggers.  With event triggers, you can use Lambda functions as glue. Here's a list of the events supported by Jets.

{% assign event_docs = site.docs | where: "categories","events" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}

The next sections cover the event triggers.

