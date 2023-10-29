---
title: Delete Project
search_title: Delete Project API
category: learn-html
order: 10
---

Now that we've seen how to deploy a Jets project, let's clean up and delete the resources. To delete everything, run:

    jets delete

You'll be prompted to make sure you want to delete the project.

    ❯ jets delete
    Deleting project...
    Are you sure you want to want to delete the demo-dev project? (y/N)

Type `y` and hit enter.

    Are you sure you want to want to delete the demo-dev project? (y/N)
    y
    First, deleting objects in s3 bucket demo-dev-s3bucket-1k60qzrj74ct3
    Deleting demo-dev...
    Waiting for stack to complete
    06:34:35PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    06:34:38PM DELETE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    06:34:38PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiDeployment20231029183005
    06:34:38PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsPreheatJob
    06:34:39PM DELETE_COMPLETE AWS::IAM::Policy IamPolicy
    06:34:49PM DELETE_COMPLETE AWS::CloudFormation::Stack ApiDeployment20231029183005
    06:34:49PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiMethods1
    06:35:00PM DELETE_COMPLETE AWS::CloudFormation::Stack ApiMethods1
    06:35:00PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsController
    06:35:00PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiResources1
    06:35:11PM DELETE_COMPLETE AWS::CloudFormation::Stack JetsController
    06:35:11PM DELETE_COMPLETE AWS::CloudFormation::Stack ApiResources1
    06:35:11PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiGateway
    06:35:12PM DELETE_COMPLETE AWS::CloudFormation::Stack JetsPreheatJob
    06:35:12PM DELETE_IN_PROGRESS AWS::IAM::Role IamRole
    06:35:12PM DELETE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer
    06:35:13PM DELETE_COMPLETE AWS::Lambda::LayerVersion GemLayer
    06:35:14PM DELETE_IN_PROGRESS AWS::S3::Bucket S3Bucket
    06:35:14PM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    Stack demo-dev deleted.
    Time took: 51s
    Time took for deletion: 51s.
    Deleting CloudWatch logs
    Project demo-dev deleted!

{% include learn/how-jets-deletes.md %}
