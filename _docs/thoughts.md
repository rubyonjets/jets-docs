---
title: Thoughts
category: top-level
subcategory: thoughts
order: 19
---

{% assign docs = site.docs | where: "categories","thoughts" | sort:"order" %}
{% for doc in docs %}
* [{{ doc.title }}]({{ doc.url }}): {{ doc.desc }}
{% endfor %}
