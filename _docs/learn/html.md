---
title: HTML Project
category: learn
subcategory: learn-html
order: 3
---

Jets can be use to build HTML apps. There are tradeoffs to using Jets compared to a more traditional framework like Rails. For more thoughts see [Considerations]({% link _docs/considerations.md %}). FWIW, we run both Jets and Rails apps.

Let's build an HTML based application in this Learn Guide!

{% assign event_docs = site.docs | where: "categories","learn-html" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
