---
title: Assets Serving
nav_text: Assets
category: top-level
subcategory: assets
order: 6
---

Jets handles asset like stylesheets, javascripts, and images by serving them from s3. When Jets deploys, it compiles assets and uploads them to the Jets managed s3 bucket.

{% assign docs = site.docs | where: "categories","assets" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
