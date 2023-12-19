---
title: Deploy Project
search_title: Deploy Project API
category: learn-rack
order: 7
---

{% include learn/jets-account.md %}

## Deploy

Let's deploy the project to AWS Lambda.

    ❯ jets deploy

The deploy command shows the stack that will be deploy and ask if you are sure.

    ❯ jets deploy
    Will deploy rack-dev
    Are you sure? (y/N) y

Type `y` and press enter to kick off the deploy.

    Are you sure? (y/N) y
    Syncing bootstrap: rack-dev
    Waiting for stack to complete
    09:38:36PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack rack-dev User Initiated
    ...
    09:38:59PM CREATE_COMPLETE AWS::CodeBuild::Project Codebuild
    09:39:04PM CREATE_COMPLETE AWS::S3::Bucket S3Bucket
    09:39:05PM CREATE_COMPLETE AWS::CloudFormation::Stack rack-dev
    Packaging code for deploy: rack-dev
    Started remote run for deploy
    Ctrl-C will stop showing logs. Jets will continue to run remotely.
    If you want to stop the remote process, use: jets stop
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/rack-dev-remote/build/rack-dev-remote%3Aff55d178-b1a9-48e7-a4ef-0ecda9cd8445/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 9s
    [Container] 2024/05/22 21:39:21.687489 Running command ./jets-go deploy
    Extracting code
    Running: jets-remote deploy
    Building docker image: rack-dev-build-3b812ef2
    #0 building with "default" instance using docker driver

    #1 [internal] load build definition from Dockerfile
    ...
    #7 [internal] load metadata for public.ecr.aws/lambda/ruby:3.2
    ...
    #16 [build  7/13] RUN bundle install
    ...
    Built docker image: rack-dev-build-3b812ef2
    Building CloudFormation templates
    Built CloudFormation templates at /tmp/jets/rack-dev/templates
    Deploying app: rack-dev
    Waiting for stack to complete
    09:40:52PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack rack-dev User Initiated
    ...
    09:42:50PM UPDATE_COMPLETE AWS::CloudFormation::Stack rack-dev
    Stack success status: UPDATE_COMPLETE
    Release 1: https://www.rubyonjets.com/projects/rack/releases/release-qfNE4SeTNZD1eDys
    Prewarming application
    Lambda Url https://gegzrb4npaleivtyqx3r2wadry0akubg.lambda-url.us-west-2.on.aws

{% include learn/jets-deploy-works.md project="rack" %}
