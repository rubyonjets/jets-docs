---
title: Lambda URL CloudFront
nav_text: CloudFront
category: routing-lambda
subcategory: routing-lambda-cloudfront
---

You can put CloudFront in of the Lambda Function URL to provide a user-friendly URL endpoint instead of the random endpoint, IE: https://svf6lbpjbdj73voyfzmpexstau0ygxxh.lambda-url.us-west-2.on.aws

{% include pro/feature.md feature_name="Lambda URL CloudFront" %}

## Features

{% assign event_docs = site.docs | where: "categories","routing-lambda-cloudfront" | sort: "order"  %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
