---
title: Deploy Project
search_title: Deploy Project API
category: learn-html
order: 7
---

{% include videos/learn/getting-started/html.md %}

{% include learn/db-prereq.md %}

## Deploy

Let's go ahead and deploy the project to AWS Lambda.

    $ jets deploy

Here's `jets deploy` command with some output:

    ❯ jets deploy
    Deploying to Lambda demo-dev app...
    ...
    Deploying CloudFormation stack with jets app!
    Waiting for stack to complete
    05:14:35PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    05:14:37PM CREATE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer
    05:14:37PM CREATE_IN_PROGRESS AWS::IAM::Role IamRole
    05:14:37PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiGateway
    05:14:38PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiGateway Resource creation Initiated
    05:14:38PM CREATE_IN_PROGRESS AWS::IAM::Role IamRole Resource creation Initiated
    05:14:46PM CREATE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer Resource creation Initiated
    05:14:46PM CREATE_COMPLETE AWS::Lambda::LayerVersion GemLayer
    05:14:49PM CREATE_COMPLETE AWS::CloudFormation::Stack ApiGateway
    05:14:49PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiResources1
    05:14:50PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiResources1 Resource creation Initiated
    05:14:56PM CREATE_COMPLETE AWS::IAM::Role IamRole
    05:14:56PM CREATE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    05:14:57PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack JetsPreheatJob
    05:14:57PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack JetsController
    05:14:58PM CREATE_IN_PROGRESS AWS::IAM::Policy IamPolicy Resource creation Initiated
    05:14:58PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack JetsPreheatJob Resource creation Initiated
    05:14:58PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack JetsController Resource creation Initiated
    05:15:00PM CREATE_COMPLETE AWS::CloudFormation::Stack ApiResources1
    05:15:13PM CREATE_COMPLETE AWS::IAM::Policy IamPolicy
    05:15:19PM CREATE_COMPLETE AWS::CloudFormation::Stack JetsController
    05:15:20PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiMethods1
    05:15:21PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiMethods1 Resource creation Initiated
    05:15:31PM CREATE_COMPLETE AWS::CloudFormation::Stack ApiMethods1
    05:15:32PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiDeployment20231029171433
    05:15:33PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack ApiDeployment20231029171433 Resource creation Initiated
    05:15:43PM CREATE_COMPLETE AWS::CloudFormation::Stack ApiDeployment20231029171433
    05:15:59PM CREATE_COMPLETE AWS::CloudFormation::Stack JetsPreheatJob
    05:16:00PM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack demo-dev
    05:16:00PM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE
    Time took: 1m 26s
    Prewarming application.
    API Gateway Endpoint: https://spsfc098x8.execute-api.us-west-2.amazonaws.com/dev/

{% include learn/jets-pro.md %}

Next, we'll review the deployed project.
