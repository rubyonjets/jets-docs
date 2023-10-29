---
title: Considerations
category: top-level
subcategory: considerations
order: 18
---

The following sections cover some considerations, limits, and benefits. Hopefully they are helpful.

{% assign event_docs = site.docs | where: "categories","considerations" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
