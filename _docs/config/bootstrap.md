---
title: Config Jets Bootstrap
nav_text: Bootstrap
category: config
subcategory: config-bootstrap
order: 3
---

{% include config/bootstrap-rb.md %}

## Config Jets Bootstrap Docs

{% assign docs = site.docs | where: "categories","config-bootstrap" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.nav_text}}]({{doc.url}}){% endfor %}
