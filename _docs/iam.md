---
title: Jets IAM Permissions
nav_text: IAM
category: top-level
subcategory: iam
order: 8
---

AWS IAM permissions are important because they control what you and your project can access and do with your AWS resources. We'll cover how Jets work with IAM permissions.

## App Lambda Function vs User Deploy IAM

It helps to think about the IAM permissions in 2 different groups.

* [App Lambda Function IAM]({% link _docs/iam/app.md %}): The permissions associated with the Lambda Function that has your app logic.
* [User Deploy IAM]({% link _docs/iam/deploy.md %}): The permissions required to deploy the project and create the resources like the Lambda Function itself.
