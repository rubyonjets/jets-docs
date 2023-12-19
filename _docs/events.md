---
title: Events Guides
category: top-level
subcategory: events
order: 13
---

Jets is also a powerful Glue Serverless Framework.

AWS Lambda supports many event triggers.  With event triggers, you can use Lambda functions as glue. Here's a list of the events supported by Jets.

{% assign docs = site.docs | where: "categories","events" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}

You may also be interested in ways to configure Jets events code:

{% assign docs = site.docs | where: "categories","events-config" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
