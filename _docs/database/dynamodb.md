---
title: Database DynamoDB
nav_text: DynamoDB
category: database
subcategory: dynamodb
order: 2
---

Jets supports DynamoDB via [Dynomite](https://github.com/boltops-tools/dynomite). It provides an ActiveRecord-like Query interface. You get a familar interface that's designed for DynamoDB.

{% assign docs = site.docs | where: "categories","dynamodb" | sort: "order" %}
{% for doc in docs %}
* [{% if doc.nav_text %}{{ doc.nav_text }}{% else %}{{ doc.title }}{% endif %}]({{doc.url}}){% endfor %}
