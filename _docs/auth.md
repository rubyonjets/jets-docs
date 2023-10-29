---
title: Authentication
category: top-level
subcategory: auth
order: 5
---

Here are some authentication solutions for Jets. The nice thing about these auth solutions are that they give you much control over the auth process than [APIGW Authorizers]({% link _docs/routing/authorizers.md %}). Importantly, the user data is kept in your database, so there's no vendor lock-in to APIGW.

{% assign event_docs = site.docs | where: "categories","auth" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
