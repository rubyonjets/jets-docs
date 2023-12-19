---
title: Rails Project
nav_text: Rails
category: learn
subcategory: learn-rails
order: 1
---

In this guide we'll create a Rails app and deploy it to Serverless AWS Lambda. Let's go.

{% assign event_docs = site.docs | where: "categories","learn-rails" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
