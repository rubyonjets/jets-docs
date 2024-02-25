---
title: Managed Application Load Balancer
nav_text: Managed
category: routing-alb
order: 1
---

By default, when you enable Application Load Balancer support, Jets creates and manages an ALB for you.

{% include pro/feature.md feature_name="Application Load Balancer" %}

## Cost

It's important to note that there's a cost with running an ALB. It works out to about $20/mo as a baseline.

Why would you want an ALB?

Well, API Gateway is **free** at low volume, but it can get **expensive** at high volume. At a certain point, the ALB cost may be worth it. Jets allows you to swap out the Routing Service.

## Configuring

Jets sets up reasonable defaults, but you can always customize them if you need to. Here's a small example.

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.enable = true
  config.alb.load_balancer.subnets = subnet_ids("dev-subnet-1", "dev-subnet-2")
  config.alb.load_balancer.security_groups = security_group_ids("my-security-group")
end
```

{% include pro/helper.md helper_name="subnet_ids" %}

**Important**:

* The load balancer subnets and security groups must all be in the same VPC.
* If you're changing the ALB subnets, CloudFormation is unable to "move" the ALB. The CloudFormation stack will rollback. You have set `config.alb.enable = false` and deploy to remove the ALB first. Then `config.alb.enable = true` and deploy again.

Here's an example of the rollback error when trying to move the ALB to a different VPC.

> 04:30:50PM UPDATE_FAILED AWS::ElasticLoadBalancingV2::LoadBalancer LoadBalancer Resource handler returned message: "Security group 'sg-0c1c8fd3EXAMPLE' does not belong to VPC 'vpc-000782e49EXAMPLE' (Service: ElasticLoadBalancingV2, Status Code: 400, Request ID: c8056281-8cac-4ad5-aa41-0a6ea00118cb)" (RequestToken: 1d9c04ca-611b-7d8d-c505-b95ede59d431, HandlerErrorCode: InvalidRequest)

{% include config/reference/header.md %}
{% include config/reference/alb/listener.md %}
{% include config/reference/alb/load_balancer.md %}
{% include config/reference/alb/security_group.md %}
{% include config/reference/alb/target_group.md %}
{% include config/reference/alb/footer.md %}

