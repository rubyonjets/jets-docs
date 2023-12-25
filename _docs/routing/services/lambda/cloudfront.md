---
title: Lambda URL CloudFront
nav_text: CloudFront
category: routing-services-lambda
subcategory: routing-services-lambda-cloudfront
---

You can put CloudFront in of the Lambda Function URL to provide a user-friendly URL endpoint instead of the random endpoint, IE: https://svf6lbpjbdj73voyfzmpexstau0ygxxh.lambda-url.us-west-2.on.aws

{% include pro/feature.md feature_name="Lambda URL CloudFront" %}

## Enabling

To enable the Lambda URL CloudFront feature:

config/deploy.rb

```ruby
Jets.application.configure do
  config.lambda.url.cloudfront.enable = false
  config.lambda.url.cloudfront.cert = acm_cert_arn("domain.com", region: "us-east-1")
  config.lambda.url.cloudfront.domain = "domain.com"
end
```

{% include pro/helper.md helper_name="acm_cert_arn" %}

Note `region: "us-east-1"` is required since CloudFront operates out of us-east-1. The ACM cert must be in us-east-1.

## Features

{% assign event_docs = site.docs | where: "categories","routing-services-lambda-cloudfront" | sort: "order"  %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
