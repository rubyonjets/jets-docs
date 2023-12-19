---
title: Resource Already Exist In Another Stack
nav_text: Resource Already Exist
category: debug
order: 10
---

## Error Already Exist in Stack

If you're getting an error like this `already exists in stack` like so:

    Here's the nested stack error details: Embedded stack arn:aws:cloudformation:us-west-2:112233445566:stack/rails-demo-dev-TemperatureEvent-PE9FUBDHE3VO/126ad730-f23e-11ee-8137-0a3d0691a5d5 was not successfully created: The following resource(s) failed to create: [RecordLambdaFunction].
    Stack arn:aws:cloudformation:us-west-2:112233445566:stack/rails-demo-dev-TemperatureEvent-PE9FUBDHE3VO/126ad730-f23e-11ee-8137-0a3d0691a5d5 Status: DELETE_COMPLETE
    Stack events:
    04:44:50AM CREATE_IN_PROGRESS AWS::CloudFormation::Stack rails-demo-dev-TemperatureEvent-PE9FUBDHE3VO User Initiated
    04:44:53AM CREATE_IN_PROGRESS AWS::Lambda::Function RecordLambdaFunction
    04:44:53AM CREATE_FAILED AWS::Lambda::Function RecordLambdaFunction rails-demo-dev-temperature_event-record already exists in stack arn:aws:cloudformation:us-west-2:112233445566:stack/rails-demo-dev-TemperatureEvent-1EPIUF1EN4LSQ/0f373000-f229-11ee-9f5f-0a3e531c7fd5
    04:44:53AM CREATE_FAILED AWS::CloudFormation::Stack rails-demo-dev-TemperatureEvent-PE9FUBDHE3VO The following resource(s) failed to create: [RecordLambdaFunction].
    04:46:03AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack rails-demo-dev-TemperatureEvent-PE9FUBDHE3VO User Initiated
    04:46:05AM DELETE_COMPLETE AWS::Lambda::Function RecordLambdaFunction
    04:46:06AM DELETE_COMPLETE AWS::CloudFormation::Stack rails-demo-dev-TemperatureEvent-PE9FUBDHE3VO

## Explanation and Solution

The error message indicates that the resource already exists in another stack. This may be from an orphaned nested stack in a `DELETE_FAILED` status from a previous deployment.

You can manually fix the error by manually deleting the orphan `DELETE_FAILED` stack and try deploying again.

    jets deploy
