---
title: Routing
category: top-level
subcategory: routing
order: 4
---

## Services

Jets supports a few Routing Services. In Jets 6, the default Routing Service  is [Lambda Function URL]({% link _docs/routing/lambda.md %}).

You can enable any of all of them if you need to. The docs for the routing services are below.

{% assign event_docs = site.docs | where: "categories","routing-services" | sort: "order"  %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}

## Intro

Jets proxies a web request from any of these AWS services:

* Lambda Function URL
* API Gateway
* Application Load Balancer

These services send an event payload to the Jets controller Lambda Function. The Funtion calls the Jets shim, which translates the event to the [Ruby Rack interface](https://github.com/rack/rack) and handles the request.

The framework you are using handles the routing heavy lifting. IE: Rails Routing.

**Note**: Jets 6 handles Routing completely different from Jets 5. In Jets 6, the framework, Rails, Sinatra, Hanami, you bring handles the routing heavy lifting.  Jets can be thought of as a proxy.

## API Gateway Console Example

![Screenshot of generated API Gateway resources in the AWS Console](https://img.boltops.com/tools/jets/routing/demo-api-gateway.png)

## API Gateway Production Deployment

Important: If you using APIGW and are deploying a production service, it is strongly recommended to use a [Custom Domain]({% link _docs/routing/apigw/custom-domain.md %}). Jets computes and figures out whether or not it needs to replace the REST API as part of deployment. When the REST API is replaced, the API Endpoint will be different. By using Custom Domain, you'll be able to keep the same endpoint.
