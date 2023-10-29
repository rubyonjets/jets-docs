---
title: DynamoDB Dynomite Model
nav_text: Model
category: dynamodb
subcategory: dynamodb-model
order: 3
---

## Schemaless

DynamoDB is a NoSQL database, you can store any columns in the record at the time of creation. DynamoDB tables are "schemaless".

{% assign docs = site.docs | where: "categories","dynamodb-model" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
