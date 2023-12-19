---
title: Jets Remote Runner Managed Hooks
nav_text: Managed
category: hooks-remote
subcategory: hooks-remote-managed
order: 1
---

Jets maintains and updates some hooks called Managed Hooks.  The advantage is that you do not have to maintain these hooks.

{% assign docs = site.docs | where: "categories","hooks-remote-managed" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}

