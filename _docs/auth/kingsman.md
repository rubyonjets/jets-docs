---
title: Kingsman
category: auth
subcategory: kingsman
order: 1
---

[Kingsman](https://github.com/rubyonjets/kingsman) is a flexible authentication solution for Jets based on Warden. It is a port of [heartcombo/devise](https://github.com/heartcombo/devise) to Jets. Kingsman requires Jets v5 and above.

{% assign event_docs = site.docs | where: "categories","kingsman" | sort: "order" %}
{% for doc in event_docs %}
* [{%- if doc.nav_text -%}{{ doc.nav_text }}{%- else -%}{{ doc.title }}{%- endif -%}]({{doc.url}}){% endfor %}
