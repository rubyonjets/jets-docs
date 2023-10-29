---
title: "Kingsman: How Tos"
nav_text: How Tos
category: kingsman
subcategory: kingsman-howtos
order: 9
---

Kingsman Example How Tos:

{% assign event_docs = site.docs | where: "categories","kingsman-howtos" | sort: "order" %}
{% for doc in event_docs %}
* [{%- if doc.nav_text -%}{{ doc.nav_text }}{%- else -%}{{ doc.title }}{%- endif -%}]({{doc.url}}){% endfor %}
