---
title: Deploy Project
search_title: Deploy Project Job
category: learn-events
order: 7
---

{% include learn/jets-account.md %}

## Deploy

Let's deploy the project to AWS Lambda.

    ❯ jets deploy

The deploy command shows the stack that will be deploy and ask if you are sure.

    ❯ jets deploy
    Will deploy events-dev
    Are you sure? (y/N) y

Type `y` and press enter to kick off the deploy.

    Are you sure? (y/N) y
    Syncing bootstrap: events-dev
    Waiting for stack to complete
    10:12:58PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack events-dev User Initiated
    ...
    10:13:21PM CREATE_COMPLETE AWS::CodeBuild::Project Codebuild
    10:13:25PM CREATE_COMPLETE AWS::S3::Bucket S3Bucket
    10:13:26PM CREATE_COMPLETE AWS::CloudFormation::Stack events-dev
    ...
    Packaging code for deploy: events-dev
    Started remote run for deploy
    Ctrl-C will stop showing logs. Jets will continue to run remotely.
    If you want to stop the remote process, use: jets stop
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/events-dev-remote/build/events-dev-remote%3A866ee4a9-4a41-4902-87cd-b9b7c62cee9a/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 8s
    [Container] 2024/05/22 22:13:42.813604 Running command ./jets-go deploy
    Extracting code
    Running: jets-remote deploy
    Building docker image: events-dev-build-a610e36f
    #0 building with "default" instance using docker driver
    ...
    #7 [internal] load metadata for public.ecr.aws/lambda/ruby:3.2
    ...
    #16 [build  7/13] RUN bundle install
    Built docker image: events-dev-build-a610e36f
    Building CloudFormation templates
    Built CloudFormation templates at /tmp/jets/events-dev/templates
    Deploying app: events-dev
    Waiting for stack to complete
    10:14:32PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack events-dev User Initiated
    ...
    10:16:13PM UPDATE_COMPLETE AWS::CloudFormation::Stack events-dev
    Stack success status: UPDATE_COMPLETE
    Release 1: https://www.rubyonjets.com/projects/events/releases/release-dDsBRgkJXVaveXXs

{% include learn/jets-deploy-works.md project="events" %}
