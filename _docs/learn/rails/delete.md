---
title: Delete Project
search_title: Delete Project API
category: learn-rails
order: 10
---

Now that we've seen how to deploy a Jets project let's clean up and delete the resources. To delete everything, run:

    jets delete

You'll be prompted to make sure you want to delete the project.

    ❯ jets delete
    Will delete rails-dev

    Uses remote runner to delete the stack and resources.

    Are you sure? (y/N)

Type `y` and hit enter.

    Are you sure? (y/N) y
    Packaging code for delete: rails-dev
    Started remote run for delete
    Ctrl-C will stop showing logs. Jets will continue to run remotely.
    If you want to stop the remote process, use: jets stop
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/rails-dev-remote/build/rails-dev-remote%3Ada89fc4d-b129-4733-af12-5aa8d49eb210/log
    Phase: SUBMITTED Status: SUCCEEDED Duration: 0s
    Phase: QUEUED Pending
    Phase: QUEUED Status: SUCCEEDED Duration: 0s
    Phase: PROVISIONING Pending
    Phase: PROVISIONING Status: SUCCEEDED Duration: 8s
    [Container] 2024/05/22 18:31:09.037534 Running command ./jets-go delete
    Extracting code
    Running: jets-remote delete
    Bootstrap deleting resources: rails-dev
    Waiting for stack to complete
    06:31:41PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack rails-dev User Initiated
    06:31:45PM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack rails-dev
    06:31:46PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack Controller
    06:31:46PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsPrewarmEvent
    06:31:46PM DELETE_IN_PROGRESS AWS::ECR::Repository EcrRepo
    06:31:47PM DELETE_COMPLETE AWS::ECR::Repository EcrRepo
    06:31:57PM DELETE_COMPLETE AWS::CloudFormation::Stack Controller
    06:32:47PM DELETE_COMPLETE AWS::CloudFormation::Stack JetsPrewarmEvent
    06:32:48PM DELETE_IN_PROGRESS AWS::IAM::Role IamRole
    06:33:01PM DELETE_COMPLETE AWS::IAM::Role IamRole
    06:33:01PM UPDATE_COMPLETE AWS::CloudFormation::Stack rails-dev
    Stack success status: UPDATE_COMPLETE

    Final Delete Phase
    Emptying s3 bucket rails-dev-s3bucket-wwk1hmpgr7ol
    Waiting for stack to complete
    06:33:17PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack rails-dev User Initiated
    06:33:19PM DELETE_IN_PROGRESS AWS::CodeBuild::Project CodebuildLambda
    06:33:19PM DELETE_IN_PROGRESS AWS::S3::Bucket S3Bucket
    06:33:19PM DELETE_IN_PROGRESS AWS::CodeBuild::Project Codebuild
    06:33:20PM DELETE_COMPLETE AWS::CodeBuild::Project CodebuildLambda
    06:33:20PM DELETE_COMPLETE AWS::CodeBuild::Project Codebuild
    06:33:20PM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    06:33:20PM DELETE_IN_PROGRESS AWS::IAM::Role CodebuildRole
    Stack rails-dev deleted.

{% include learn/how-jets-deletes.md type="HTML" %}
