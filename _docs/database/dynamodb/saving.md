---
title: DynamoDB Dynomite Saving
nav_text: Saving
category: dynamodb
subcategory: dynamodb-saving
order: 4
---

DynamoDB supports an interface similar to the [Active Record Basics](https://guides.rubyonrails.org/active_record_basics.html#crud-reading-and-writing-data).

{% assign docs = site.docs | where: "categories","dynamodb-saving" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
