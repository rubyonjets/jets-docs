---
title: Local Deploy IAM Policy
nav_text: Local
category: iam-deploy
order: 2
---

The local IAM permissions are what you would need if you are running at `jets deploy` on your **local** machine. These permissions are not as widely scope as you might imagine because Jets client will create a remote runner for the deployment heavy lifting. The Jets client may need some other permission for some of it's CLI features, IE: `jets logs` needs access to CloudWatch Logs. Here are some of the IAM permissions required.

* CloudFormation
* IAM
* S3
* CloudWatch Logs
* CloudBuild

**Note**: These permissions may change in the future as Jets evolves and adds features.

## Instructions

It is recommended that you create an IAM group and associate it with the IAM users that need access to use `jets deploy`.  Here are starter instructions and a policy that you can tailor for your needs. You can follow either the CLI or Console instructions.

* [IAM Create Instructions]({% link _docs/iam/deploy/create.md %})

## Related

The CI Runner permissions are similar to the local IAM permissions because when the CI process runs it's essentially does what you would do locally, IE: `jets deploy`. For details, see: [Jets CI IAM Permissions]({% link _docs/ci/iam.md %}).

{% include iam/local-vs-remote-note.md %}