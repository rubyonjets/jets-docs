---
title: Delete Project
search_title: Delete Project Job
category: learn-job
order: 10
---

{% include videos/learn/getting-started/job.md %}

Now that we've seen how to deploy a Jets project, let's clean up and delete the resources. To delete everything, run:

    jets delete

You'll be prompted to make sure you want to delete the project.

    ❯ jets delete
    Deleting project...
    Are you sure you want to want to delete the demo-dev project? (y/N)

Type `y` and hit enter.

    Are you sure you want to want to delete the demo-dev project? (y/N)
    y
    First, deleting objects in s3 bucket demo-dev-s3bucket-f1480z5lxwym
    Deleting demo-dev...
    Waiting for stack to complete
    03:00:14AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    03:00:17AM DELETE_IN_PROGRESS AWS::CloudFormation::Stack HardJob
    03:00:17AM DELETE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    03:00:18AM DELETE_COMPLETE AWS::IAM::Policy IamPolicy
    03:01:04AM DELETE_COMPLETE AWS::CloudFormation::Stack HardJob
    03:01:05AM DELETE_IN_PROGRESS AWS::IAM::Role IamRole
    03:01:05AM DELETE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer
    03:01:06AM DELETE_COMPLETE AWS::Lambda::LayerVersion GemLayer
    03:01:06AM DELETE_IN_PROGRESS AWS::S3::Bucket S3Bucket
    03:01:07AM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    Stack demo-dev deleted.
    Time took: 1m 6s
    Time took for deletion: 1m 6s.
    Deleting CloudWatch logs
    Project demo-dev deleted!

{% include learn/how-jets-deletes.md type="Job" %}
