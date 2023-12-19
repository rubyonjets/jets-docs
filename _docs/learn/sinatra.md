---
title: Sinatra Project
nav_text: Sinatra
category: learn
subcategory: learn-sinatra
order: 2
---

In this guide we'll create a Sinatra app and deploy it to Serverless AWS Lambda. Let's go.

{% assign event_docs = site.docs | where: "categories","learn-sinatra" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
