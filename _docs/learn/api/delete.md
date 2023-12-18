---
title: Delete Project
search_title: Delete Project API
category: learn-api
order: 10
---

{% include videos/learn/getting-started/api.md %}

Now that we've seen how to deploy a Jets project, let's clean up and delete the resources. To delete everything, run:

    jets delete

You'll be prompted to make sure you want to delete the project.

    ❯ jets delete
    Deleting project...
    Are you sure you want to want to delete the demo-dev project? (y/N)

Type `y` and hit enter.

    Are you sure you want to want to delete the demo-dev project? (y/N)
    y
    First, deleting objects in s3 bucket demo-dev-s3bucket-1ouz0krhdx74v
    Deleting demo-dev...
    Waiting for stack to complete
    02:12:04AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    02:12:06AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiDeployment20231029020436
    02:12:06AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsPreheatJob
    02:12:06AM DELETE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    02:12:07AM DELETE_COMPLETE AWS::IAM::Policy IamPolicy
    02:12:17AM DELETE_COMPLETE AWS::CloudFormation::Stack ApiDeployment20231029020436
    02:12:18AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiMethods1
    02:12:28AM DELETE_COMPLETE AWS::CloudFormation::Stack ApiMethods1
    02:12:29AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiResources1
    02:12:29AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsController
    02:12:39AM DELETE_COMPLETE AWS::CloudFormation::Stack ApiResources1
    02:12:40AM DELETE_COMPLETE AWS::CloudFormation::Stack JetsController
    02:12:40AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiGateway
    02:12:40AM DELETE_COMPLETE AWS::CloudFormation::Stack JetsPreheatJob
    02:12:41AM DELETE_IN_PROGRESS AWS::IAM::Role IamRole
    02:12:41AM DELETE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer
    02:12:42AM DELETE_COMPLETE AWS::Lambda::LayerVersion GemLayer
    02:12:42AM DELETE_IN_PROGRESS AWS::S3::Bucket S3Bucket
    02:12:43AM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    Stack demo-dev deleted.
    Time took: 51s
    Time took for deletion: 51s.
    Deleting CloudWatch logs
    Project demo-dev deleted!

{% include learn/how-jets-deletes.md type="API" %}
