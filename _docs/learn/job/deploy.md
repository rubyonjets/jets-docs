---
title: Deploy Project
search_title: Deploy Project Job
category: learn-job
order: 7
---

Let's go ahead and deploy the project to AWS Lambda.

    jets deploy

Here's `jets deploy` command with some output:

    ❯ jets deploy
    Deploying to Lambda demo-dev app...
    # ...
    02:33:45AM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    02:33:47AM CREATE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer
    02:33:47AM CREATE_IN_PROGRESS AWS::IAM::Role IamRole
    02:33:48AM CREATE_IN_PROGRESS AWS::IAM::Role IamRole Resource creation Initiated
    02:33:55AM CREATE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer Resource creation Initiated
    02:33:56AM CREATE_COMPLETE AWS::Lambda::LayerVersion GemLayer
    02:34:06AM CREATE_COMPLETE AWS::IAM::Role IamRole
    02:34:06AM CREATE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    02:34:07AM CREATE_IN_PROGRESS AWS::CloudFormation::Stack HardJob
    02:34:07AM CREATE_IN_PROGRESS AWS::IAM::Policy IamPolicy Resource creation Initiated
    02:34:08AM CREATE_IN_PROGRESS AWS::CloudFormation::Stack HardJob Resource creation Initiated
    02:34:23AM CREATE_COMPLETE AWS::IAM::Policy IamPolicy
    02:35:24AM CREATE_COMPLETE AWS::CloudFormation::Stack HardJob
    02:35:26AM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack demo-dev
    02:35:26AM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE
    Time took: 1m 41s

{% include learn/jets-pro.md mode="job" %}

Next, we'll review the deployed project.
