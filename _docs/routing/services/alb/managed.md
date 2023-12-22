---
title: Managed Application Load Balancer
nav_text: Managed
category: routing-services-alb
order: 1
---

By default, when you enable Application Load Balancer support, Jets creates and manages an ALB for you.

## Cost

It's important to note that there's a cost with running an ALB. It works out to about $20/mo as a baseline.

Why would you want an ALB then?

Well, API Gateway is **free** at low volume, but at high-volume it can get **expensive**. At a certain point, the ALB cost may be worth it. Jets makes it easy to swap out the Routing Service.

## Configuring

Jets sets up reasonable defaults, but you can always customize them if you need to. Here's a small example.

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.enable = true
  config.alb.listener.port = 80 # port 80 is default
end
```

{% include config/reference/header.md %}
{% include config/reference/alb.md %}
{% include config/reference/footer.md %}

