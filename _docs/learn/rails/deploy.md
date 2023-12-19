---
title: Deploy Project
search_title: Deploy Project API
category: learn-rails
order: 7
---

{% include learn/jets-account.md %}

## Deploy

Let's deploy the project to AWS Lambda.

    ❯ jets deploy

The deploy command shows the stack that will be deploy and ask if you are sure.

    ❯ jets deploy
    Will deploy rails-dev
    Are you sure? (y/N) y

Type `y` and press enter to kick off the deploy.

    Are you sure? (y/N) y
    Syncing bootstrap: rails-dev
    Waiting for stack to complete
    06:00:06PM CREATE_IN_PROGRESS AWS::CloudFormation::Stack rails-dev User Initiated
    ...
    06:00:30PM CREATE_COMPLETE AWS::CodeBuild::Project Codebuild
    06:00:35PM CREATE_COMPLETE AWS::S3::Bucket S3Bucket
    06:00:36PM CREATE_COMPLETE AWS::CloudFormation::Stack rails-dev
    Stack success status: CREATE_COMPLETE
    Packaging code for deploy: rails-dev
    Started remote run for deploy
    Ctrl-C will stop showing logs. Jets will continue to run remotely.
    If you want to stop the remote process, use: jets stop
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/rails-dev-remote/build/rails-dev-remote%3Af6976ed3-5149-4b2c-8430-a578e4103707/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 9s
    [Container] 2024/05/22 18:00:51.038105 Running command ./jets-go deploy
    Extracting code
    Running: jets-remote deploy
    Syncing bootstrap: rails-dev
    Building docker image: rails-dev-build-90c85527
    #0 building with "default" instance using docker driver

    #1 [internal] load build definition from Dockerfile
    ...
    #22 [build 10/16] RUN bundle install
    ...
    #27 [build 15/16] COPY jets/scripts/precompile_assets.sh jets/scripts/precompile_assets.sh
    ...
    Built docker image: rails-dev-build-90c85527
    => docker tag rails-dev-build-90c85527 112233445566.dkr.ecr.us-west-2.amazonaws.com/rails-dev-ecrrepo-typj5jsdhrix:v1-2024-05-22T18-02-13Z-main-e9de6b4-dirty
    => docker push 112233445566.dkr.ecr.us-west-2.amazonaws.com/rails-dev-ecrrepo-typj5jsdhrix:v1-2024-05-22T18-02-13Z-main-e9de6b4-dirty
    Building CloudFormation templates
    Built CloudFormation templates at /tmp/jets/rails-dev/templates
    Deploying app: rails-dev
    Waiting for stack to complete
    06:02:30PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack rails-dev User Initiated
    ...
    06:04:29PM UPDATE_COMPLETE AWS::CloudFormation::Stack rails-dev
    Stack success status: UPDATE_COMPLETE
    Release 1: https://www.rubyonjets.com/projects/rails/releases/release-KJwETdIqrd1OC7LR
    Prewarming application
    Lambda Url https://awi4waxoquptkydjggfnlv4r3m0hpxez.lambda-url.us-west-2.on.aws

{% include learn/jets-deploy-works.md project="rails" %}
