---
title: DynamoDB Dynomite Querying
nav_text: Querying
category: dynamodb
subcategory: dynamodb-querying
order: 5
---

DynamoDB supports an interface that's similar to the [Active Record Query Interface](https://guides.rubyonrails.org/active_record_querying.html). The implementation is more lightweight and handles lazy loading slightly differently. We'll cover it next.

{% assign docs = site.docs | where: "categories","dynamodb-querying" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}

