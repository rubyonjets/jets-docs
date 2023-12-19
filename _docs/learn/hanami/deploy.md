---
title: Deploy Project
search_title: Deploy Project API
category: learn-hanami
order: 7
---

{% include learn/jets-account.md %}

## Deploy

Let's deploy the project to AWS Lambda.

    ❯ jets deploy

The deploy command shows the stack that will be deploy and ask if you are sure.

    ❯ jets deploy
    Will deploy hanami-dev
    Are you sure? (y/N) y

Type `y` and press enter to kick off the deploy.

    Are you sure? (y/N) y
    Syncing bootstrap: hanami-dev
    Waiting for stack to complete
    03:45:54AM CREATE_IN_PROGRESS AWS::CloudFormation::Stack hanami-dev User Initiated
    ...
    03:46:16AM CREATE_COMPLETE AWS::CodeBuild::Project Codebuild
    03:46:17AM CREATE_COMPLETE AWS::CodeBuild::Project CodebuildLambda
    03:46:21AM CREATE_COMPLETE AWS::S3::Bucket S3Bucket
    03:46:22AM CREATE_COMPLETE AWS::CloudFormation::Stack hanami-dev
    Stack success status: CREATE_COMPLETE
    Packaging code for deploy: hanami-dev
    Started remote run for deploy
    Ctrl-C will stop showing logs. Jets will continue to run remotely.
    If you want to stop the remote process, use: jets stop
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/hanami-dev-remote/build/hanami-dev-remote%3Ace78c307-061a-4f8f-8402-0ad33e0899e5/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 9s
    [Container] 2024/05/22 03:46:40.919678 Running command ./jets-go deploy
    Extracting code
    Running: jets-remote deploy
    Building docker image: hanami-dev-build-33105d4d
    #0 building with "default" instance using docker driver

    #1 [internal] load build definition from Dockerfile
    ...
    #6 [internal] load metadata for docker.io/library/ruby:3.2.3-slim
    ...
    #22 [build 11/16] RUN bundle install
    ...
    #26 [build 15/16] RUN yarn install
    ...
    #27 [build 16/16] RUN bundle exec hanami assets compile
    ...
    Built docker image: hanami-dev-build-33105d4d
    => docker tag hanami-dev-build-33105d4d 536766270177.dkr.ecr.us-west-2.amazonaws.com/hanami-dev-ecrrepo-fduifazvm43b:v1-2024-05-22T03-48-00Z-main-468f142
    => docker push 536766270177.dkr.ecr.us-west-2.amazonaws.com/hanami-dev-ecrrepo-fduifazvm43b:v1-2024-05-22T03-48-00Z-main-468f142
    Building CloudFormation templates
    Built CloudFormation templates at /tmp/jets/hanami-dev/templates
    Deploying app: hanami-dev
    Waiting for stack to complete
    03:48:14AM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack hanami-dev User Initiated
    ...
    03:50:13AM UPDATE_COMPLETE AWS::CloudFormation::Stack hanami-dev
    Stack success status: UPDATE_COMPLETE
    Release 1: https://www.rubyonjets.com/projects/hanami/releases/release-02l1e7NSpB9kHsys
    Prewarming application
    Lambda Url https://x6ge6mf7vpcj5yh72tvlw522zq0zyuxd.lambda-url.us-west-2.on.aws

{% include learn/jets-deploy-works.md project="hamami" %}
