---
title: Versus
category: top-level
subcategory: vs
order: 8
---

We'll compare and discuss the difference between Jets vs other deployment services.

{% assign docs = site.docs | where: "categories","vs" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
