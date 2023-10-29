---
title: Jets Custom Renderers
nav_text: Custom Renderers
category: howtos
subcategory: howtos-renderers
order: 4
---

We'll cover how to use renderers including some custom ones:

{% assign event_docs = site.docs | where: "categories","howtos-renderers" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
