---
title: Delete Project
search_title: Delete Project API
category: learn-hanami
order: 10
---

Now that we've seen how to deploy a Jets project let's clean up and delete the resources. To delete everything, run:

    jets delete

You'll be prompted to make sure you want to delete the project.

    ❯ jets delete
    Will delete hanami-dev

    Uses remote runner to delete the stack and resources.

    Are you sure? (y/N)

Type `y` and hit enter.

    Are you sure? (y/N) y
    Packaging code for deployment: hanami-dev
    Started remote run for delete
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/hanami-dev-remote/build/hanami-dev-remote%3Abd7369ba-8ab2-4b46-beb5-1ab06459dcd8/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 8s
    [Container] 2024/04/10 11:42:54.873953 Running command ./jets-go delete
    Extracting app code
    Running: jets-remote delete
    Syncing bootstrap to delete stack: hanami-dev
    Waiting for stack to complete
    11:43:30AM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack hanami-dev User Initiated
    11:43:34AM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack hanami-dev
    11:43:34AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsPrewarmEvent
    11:43:34AM DELETE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    11:43:34AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack Controller
    11:43:34AM DELETE_IN_PROGRESS AWS::ECR::Repository EcrRepo
    11:43:35AM DELETE_COMPLETE AWS::IAM::Policy IamPolicy
    11:43:35AM DELETE_COMPLETE AWS::ECR::Repository EcrRepo
    11:43:45AM DELETE_COMPLETE AWS::CloudFormation::Stack Controller
    11:44:35AM DELETE_COMPLETE AWS::CloudFormation::Stack JetsPrewarmEvent
    11:44:36AM DELETE_IN_PROGRESS AWS::IAM::Role IamRole
    11:44:48AM DELETE_COMPLETE AWS::IAM::Role IamRole
    11:44:49AM UPDATE_COMPLETE AWS::CloudFormation::Stack hanami-dev
    Stack success status: UPDATE_COMPLETE

    Emptying s3 bucket hanami-dev-s3bucket-gk9czdttfpvd
    Waiting for stack to complete
    11:45:02AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack hanami-dev User Initiated
    11:45:05AM DELETE_IN_PROGRESS AWS::S3::Bucket S3Bucket
    11:45:05AM DELETE_IN_PROGRESS AWS::CodeBuild::Project Codebuild
    11:45:07AM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    11:45:07AM DELETE_COMPLETE AWS::CodeBuild::Project Codebuild
    11:45:07AM DELETE_IN_PROGRESS AWS::IAM::Role CodebuildRole
    Stack hanami-dev deleted.

{% include learn/how-jets-deletes.md type="HTML" %}
