---
title: API Project
category: learn
subcategory: learn-api
order: 2
---

Jets can be use to build APIs. This is probably the one of the best use-cases for Jets. It certainly a popular way folks are using Jets.

{% assign event_docs = site.docs | where: "categories","learn-api" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
