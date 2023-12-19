---
title: Delete Project
search_title: Delete Project API
category: learn-rack
order: 10
---

Now that we've seen how to deploy a Rack project with Jets let's clean up and delete the resources. To delete everything, run:

    jets delete

You'll be prompted to make sure you want to delete the project.

    ❯ jets delete
    Will delete rack-dev

    Uses remote runner to delete the stack and resources.

    Are you sure? (y/N)

Type `y` and hit enter.

    Are you sure? (y/N) y
    Packaging code for deployment: rack-dev
    Started remote run for delete
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/rack-dev-remote/build/rack-dev-remote%3A1943a0b8-c0ef-43df-9846-702e40eb4471/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 6s
    [Container] 2024/04/09 04:47:28.608493 Running command ./jets-go delete
    Extracting app code
    Running: jets-remote delete
    Syncing bootstrap to delete stack: rack-dev
    Waiting for stack to complete
    04:47:34AM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack rack-dev User Initiated
    04:47:37AM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack rack-dev
    04:47:38AM DELETE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    04:47:38AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsPrewarmEvent
    04:47:38AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack Controller
    04:47:39AM DELETE_COMPLETE AWS::IAM::Policy IamPolicy
    04:47:49AM DELETE_COMPLETE AWS::CloudFormation::Stack Controller
    04:48:39AM DELETE_COMPLETE AWS::CloudFormation::Stack JetsPrewarmEvent
    04:48:40AM DELETE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer
    04:48:40AM DELETE_IN_PROGRESS AWS::IAM::Role IamRole
    04:48:40AM DELETE_COMPLETE AWS::Lambda::LayerVersion GemLayer
    04:48:52AM DELETE_COMPLETE AWS::IAM::Role IamRole
    04:48:52AM UPDATE_COMPLETE AWS::CloudFormation::Stack rack-dev
    Stack success status: UPDATE_COMPLETE

    Emptying s3 bucket rack-dev-s3bucket-hblotmmffffs
    Waiting for stack to complete
    04:49:07AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack rack-dev User Initiated
    04:49:09AM DELETE_IN_PROGRESS AWS::S3::Bucket S3Bucket
    04:49:09AM DELETE_IN_PROGRESS AWS::CodeBuild::Project Codebuild
    04:49:10AM DELETE_COMPLETE AWS::CodeBuild::Project Codebuild
    04:49:11AM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    04:49:11AM DELETE_IN_PROGRESS AWS::IAM::Role CodebuildRole
    Stack rack-dev deleted.

{% include learn/how-jets-deletes.md framework="rack" %}
