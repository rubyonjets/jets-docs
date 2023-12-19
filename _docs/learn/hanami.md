---
title: Hanami Project
nav_text: Hanami
category: learn
subcategory: learn-hanami
order: 3
---

In this guide we'll create a Hanami app and deploy it to Serverless AWS Lambda. Let's go.

{% assign event_docs = site.docs | where: "categories","learn-hanami" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
