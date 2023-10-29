---
title: Secrets
search_title: Secrets and Credentials
category: top-level
subcategory: secrets
order: 6
---

There are a few ways to securely store secrets and credentials with Jets.

{% assign event_docs = site.docs | where: "categories","secrets" | sort: "order" %}
{% for doc in event_docs %}
* [{%- if doc.nav_text -%}{{ doc.nav_text }}{%- else -%}{{ doc.title }}{%- endif -%}]({{doc.url}}): {{ doc.desc }}{% endfor %}
