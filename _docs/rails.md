---
title: Jets Rails
nav_text: Rails
category: top-level
subcategory: rails
order: 9
---

Jets 6 supports Rails. The follow docs provide some docs with using Jets to deploy Rails apps.

{% assign event_docs = site.docs | where: "categories","rails" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
