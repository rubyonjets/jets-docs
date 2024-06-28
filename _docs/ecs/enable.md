---
title: "Jets ECS Enabling"
nav_text: Enable
category: ecs
order: 1
desc: How to configure Jets to deploy to ECS Fargate.
---

To tell Jets to deploy ECS Fargate

## Configure

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.deployment.type = "ecs"
end
```

Jets will deploy to ECS Fargate instead of AWS Lambda.

## CPU and Memory

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ecs.tasks.web.cpu = 512
  config.ecs.tasks.web.cpu = 2048
  # Override for worker tasks or other process types
  config.ecs.tasks.worker.cpu = 1024
  config.ecs.tasks.worker.cpu = 2048
end
```

There are ranges of values you are allowed to used.

* For example if you specify 256 (.25 vCPU), then you can use memory values of: 512 (0.5 GB), 1024 (1 GB), 2048 (2 GB)

For other allowed values refer to the docs:

* [Amazon ECS task definition differences for the Fargate launch type: Task CPU and memory](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size)
* [CloudFormation AWS::ECS::TaskDefinition CPU and Memory](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html#cfn-ecs-taskdefinition-cpu)
