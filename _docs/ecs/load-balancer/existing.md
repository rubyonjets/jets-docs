---
title: Using Existing Load Balancer Target Group
nav_text: Existing
category: load-balancer
order: 8
---

You can use an existing Load Balancer and its Target Group with the `elb.existing` settings. You may want to do this to save ELB costs. Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do |config|
  config.elb.existing.target_group = elb_target_group_arn("target-group-name")
  # Hard-coded examples
  # config.elb.existing.target_group = "arn:aws:elasticloadbalancing:us-west-2:111111111111:targetgroup/elb-d-Targe-12NCI2V1X5TBS/ed56e555b7e8d0db"
  # config.elb.existing.dns_name = "elb-dev-Elb-FOOAR4WRTPXKY-421647888.us-west-2.elb.amazonaws.com"
end
```

When using an existing Load Balancer, Jets will not create a managed ELB. Hence other ELB settings are ignored by Jets. You're "bringing your own" Load Balancer, it's outside the control of Jets. You take on the responsibility of managing the ELB and its settings.

