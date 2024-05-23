---
title: Config Jets Project
nav_text: Project
category: config
subcategory: config-project
order: 2
---

{% include config/project-rb.md %}

## Config Jets Project Docs

{% assign docs = site.docs | where: "categories","config-project" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.nav_text}}]({{doc.url}}){% endfor %}
