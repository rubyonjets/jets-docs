---
title: Deploy Project
search_title: Deploy Project API
category: learn-api
order: 7
---

{% include videos/learn/getting-started/api.md %}

{% include learn/db-prereq.md %}

## Deploy

Let's go ahead and deploy the project to AWS Lambda.

    $ jets deploy

Here's `jets deploy` command with some output:

    ❯ jets deploy
    Deploying to Lambda demo-dev app...
    Building CloudFormation templates
    Deploying CloudFormation stack with jets app!
    09:50:35PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    ...
    09:51:58PM CREATE_COMPLETE AWS::CloudFormation::Stack JetsPreheatJob
    09:52:00PM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack demo-dev
    09:52:00PM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE
    Time took: 1m 26s
    Prewarming application.
    API Gateway Endpoint: https://2bmdurd1ra.execute-api.us-west-2.amazonaws.com/dev/

{% include learn/jets-pro.md %}

Next, we'll review the deployed project.
