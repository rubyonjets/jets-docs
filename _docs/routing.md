---
title: Routing
category: top-level
subcategory: routing
order: 5
---

## Services

Jets supports a few Routing Services. Jets proxies a web request from any of these AWS services:

{% assign event_docs = site.docs | where: "categories","routing" | sort: "order"  %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}

These services send an event payload to the Jets controller Lambda Function. The Fucntion calls the Jets shim, which translates the event to the [Ruby Rack interface](https://github.com/rack/rack) and handles the request.

The default Routing Service  is [Lambda Function URL]({% link _docs/routing/lambda.md %}). You can enable any of all of them.

The framework you are using handles the routing heavy lifting. IE: Rails Routing.

**Note**: Jets 6 handles Routing completely different from Jets 5. In Jets 6, the framework, Rails, Sinatra, Hanami, you bring handles the routing heavy lifting.  Jets can be thought of as a proxy.

