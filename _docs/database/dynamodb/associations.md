---
title: DynamoDB Dynomite Associations
nav_text: Associations
category: dynamodb
subcategory: dynamodb-associations
order: 7
---

Dynomite supports Associations. Associations are connections between 2 models. For example, a `User` can `have_many` `Posts`.

{% assign docs = site.docs | where: "categories","dynamodb-associations" | sort: "order" %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}

## Id Field as Primary Key

Associations work by storing the `id` to association-managed fields like `users.posts_ids`, `posts.user_id`, etc. The `id` field should be the Primary Key Partition Key. Otherwise, dynomite uses `where("id.in": ids)` to find the associated items. This results in a slow `scan` operation. When the `id` field is a partition key, dynomite can use the fast `get_item` operation in parallel.

