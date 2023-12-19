---
title: Uploads Serving
nav_text: Uploads
category: top-level
subcategory: uploads
order: 6
---

Jets can create a CloudFront CDN to serve the files uploaded to your site.

{% assign docs = site.docs | where: "categories","uploads" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
