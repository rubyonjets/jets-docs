---
title: Jets Events Properties
nav_text: Properties
category: events
subcategory: events-properties
order: 88
---

You can configure Jets events Lambda Function properties independently.

{% assign docs = site.docs | where: "categories","events-config" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
