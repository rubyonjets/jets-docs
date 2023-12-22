---
title: Routing Services
category: routing
subcategory: routing-services
order: 4
---

Jets supports a few Routing Services. In Jets 6, the default Routing Service  is [Lambda Function URL]({% link _docs/routing/services/lambda.md %}).

You can enable any of all of them if you need to. The docs for the routing services are below.

{% assign event_docs = site.docs | where: "categories","routing-services" | sort: "order"  %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
