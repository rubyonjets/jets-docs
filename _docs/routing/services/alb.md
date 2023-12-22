---
title: Application Load Balancer
nav_text: ALB
category: routing-services
subcategory: routing-services-alb
order: 3
---

Application Load Balancers, ALBs, can be us as a routing service in Jets 6 and above.

**NOTE**: Application Load Balancers are a [Jets Pro](https://www.rubyonjets.com) Feature.

## Enabling

To enable the Application Load Balancer feature:

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.enable = true
end
```

## Features

{% assign event_docs = site.docs | where: "categories","routing-services-alb" | sort: "order"  %}
{% for doc in event_docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
