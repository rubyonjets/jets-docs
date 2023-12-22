---
title: Existing Application Load Balancer
nav_text: Existing
category: routing-services-alb
order: 2
---

## Why Bring Your Own Load Balancer

Jets supports "Bringing Your Own Load Balancer". The [Jets Managed ALB]({% link _docs/routing/services/alb/managed.md %}) has reasonable defaults and a ton of features. It should covers most use-cases. However, you might have special requirements where your a Custom Load Balancer is required. Jets makes this quite easy to do.

Additionally, each Load Balancer costs $$$. You can use a "Shared Load Balancer" to save costs. The Shared Load Balancer can route base on the `host` or `path` to different apps.

When using an existing Load Balancer, the other elb settings are ignored by Jets. This is because you're "bringing your own" Load Balancer, it's outside the control of Jets. You take on the responsibility of managing the ELB and its settings.

## Enabling

You simply register the Jets Controller Lambda Function as a Target the ALB Target Group. You can do this via the AWS console or with this command:

    jets alb:register TARGET_GROUP

When you register the target group, Lambda Function Permission is also added that allows the AWS Load Balancing Service to talk to your Jets Controller Lambda Function.

## Configuring

You can use an existing Load Balancer and its Target Group with the `alb.existing` settings. Example:

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.existing.target_group = alb_target_group_arn("my-target-group")
  config.alb.existing.dns_name = "elb-dev-Elb-FOOAR4WRTPXKY-421647888.us-west-2.alb.amazonaws.com"
end
```

{% include config/reference/header.md %}
{% include config/reference/alb-existing.md %}
{% include config/reference/footer.md %}

## Lambda Function Policy Permission

Here's a tip how on to check the Lambda Function Policy Permission

    aws lambda get-policy --function-name demo-dev-controller | jq '.Policy | fromjson'

Here's an example with output

    $ aws lambda get-policy --function-name demo-dev-controller | jq '.Policy | fromjson'
    {
        "Version": "2012-10-17",
        "Id": "default",
        "Statement": [
            {
            "Sid": "AWS-ALB_Invoke-targetgroup-test-target-group-b1a24e344bb1f8d9",
            "Effect": "Allow",
            "Principal": {
                "Service": "elasticloadbalancing.amazonaws.com"
            },
            "Action": "lambda:InvokeFunction",
            "Resource": "arn:aws:lambda:us-west-2:112233445566:function:demo-dev-controller",
            "Condition": {
                "ArnLike": {
                "AWS:SourceArn": "arn:aws:elasticloadbalancing:us-west-2:112233445566:targetgroup/test-target-group/b1a24e344bb1f8d9"
                }
            }
            }
        ]
    }
