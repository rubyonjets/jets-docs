---
title: Rack Project
nav_text: Rack
category: learn
subcategory: learn-rack
order: 4
---

In this guide we'll create a Rack app and deploy it to Serverless AWS Lambda. Let's go.

{% assign event_docs = site.docs | where: "categories","learn-rack" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
