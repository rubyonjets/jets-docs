---
title: HTML Project
category: learn
subcategory: learn-html
order: 3
---

{% include videos/learn/getting-started/html.md %}

Jets can be use to build HTML apps. Let's build an HTML based application in this Learn Guide!

{% assign event_docs = site.docs | where: "categories","learn-html" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
