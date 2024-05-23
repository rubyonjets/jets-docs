---
title: Jets Config Helpers
nav_text: Helpers
category: config
subcategory: config-helpers
order: 5
---

Jets has some config helpers that can help make your config files more human-readable. The helpers are mostly available in `jets/config/deploy.rb` only.

{% assign event_docs = site.docs | where: "categories","config-helpers" | sort: "order" %}
{% for doc in event_docs %}
* [{{doc.nav_text}}]({{doc.url}}){% endfor %}
