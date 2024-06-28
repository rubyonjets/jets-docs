---
title: Jets Debug Existing ELB
nav_text: Existing ELB
category: debug
order: 20
---


If you're using an existing ELB, you must make sure that target group is of target type ip. When using ECS Fargate, awsvpc mode is required and the target group must be IP type. Otherwise, you'll get this error:

    06:43:57PM UPDATE_FAILED AWS::ECS::Service ServiceWeb Resource handler returned message: "Invalid request provided: UpdateService error: The provided target group arn:aws:elasticloadbalancing:us-west-2:536766270177:targetgroup/demo-web-dev/7486472e6bc0255a has target type instance, which is incompatible with the awsvpc network mode specified in the task definition. (Service: AmazonECS; Status Code: 400; Error Code: InvalidParameterException; Request ID: 2b9ebea1-1770-411b-b2b5-4c911624a626; Proxy: null)" (RequestToken: 4472536d-cdcd-b1f9-117c-bfc826e2db53, HandlerErrorCode: InvalidRequest)
    06:43:58PM UPDATE_ROLLBACK_IN_PROGRESS AWS::CloudFormation::Stack demo-dev-Ecs-GNR4U03GNDWD The following resource(s) failed to update: [ServiceWeb].
