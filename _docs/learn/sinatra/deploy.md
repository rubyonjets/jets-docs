---
title: Deploy Project
search_title: Deploy Project API
category: learn-sinatra
order: 7
---

{% include learn/jets-account.md %}

## Deploy

Let's deploy the project to AWS Lambda.

    ❯ jets deploy

The deploy command shows the stack that will be deploy and ask if you are sure.

    ❯ jets deploy
    Will deploy sinatra-dev
    Are you sure? (y/N) y

Type `y` and press enter to kick off the deploy.

    Are you sure? (y/N) y
    Syncing bootstrap: sinatra-dev
    06:56:02PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack sinatra-dev User Initiated
    ...
    06:56:25PM CREATE_COMPLETE AWS::CodeBuild::Project Codebuild
    06:56:30PM CREATE_COMPLETE AWS::S3::Bucket S3Bucket
    06:56:31PM CREATE_COMPLETE AWS::CloudFormation::Stack sinatra-dev
    Packaging code for deploy: sinatra-dev
    Started remote run for deploy
    Ctrl-C will stop showing logs. Jets will continue to run remotely.
    If you want to stop the remote process, use: jets stop
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/sinatra-dev-remote/build/sinatra-dev-remote%3A8aea0f52-a984-4654-a418-31a2cde584c5/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 9s
    [Container] 2024/05/22 18:56:46.211304 Running command ./jets-go deploy
    Extracting code
    Running: jets-remote deploy
    Building docker image: sinatra-dev-build-4f9cbf8f
    #0 building with "default" instance using docker driver
    ...
    #7 [internal] load metadata for public.ecr.aws/lambda/ruby:3.2
    ...
    #13 [build  7/13] RUN bundle install
    ...
    Built docker image: sinatra-dev-build-4f9cbf8f
    Building CloudFormation templates
    Built CloudFormation templates at /tmp/jets/sinatra-dev/templates
    Deploying app: sinatra-dev
    Waiting for stack to complete
    06:57:36PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack sinatra-dev User Initiated
    ...
    06:59:33PM UPDATE_COMPLETE AWS::CloudFormation::Stack sinatra-dev
    Stack success status: UPDATE_COMPLETE
    Release 1: https://www.rubyonjets.com/projects/sinatra/releases/release-K5AHC5FBQiaYhdUY
    Prewarming application
    Lambda Url https://aodietp35hnzkz7xpjx27cdxlu0zzzld.lambda-url.us-west-2.on.aws

{% include learn/jets-deploy-works.md project="sinatra" %}
