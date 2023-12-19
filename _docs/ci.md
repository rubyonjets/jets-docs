---
title: Jets Continuous Integration
nav_text: CI
category: top-level
subcategory: ci
order: 12
---

Jets can set up AWS CodeBuild as the CI Runner to handle Continuous Integration. So a `git push` can automatically deploy your Jets app.

Jets Continuous Integration Docs:

{% assign docs = site.docs | where: "categories","ci" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.nav_text}}]({{doc.url}}){% endfor %}
