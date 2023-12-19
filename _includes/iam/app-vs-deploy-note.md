## App Lambda Function vs User Deploy IAM Policies

The IAM Policies docs on this page refer to the IAM policy associated with your **Lambda Execution Role**. These permissions control what AWS resources your Lambda functions have access to. This differs from the IAM Role required to deploy. If you are looking for the minimal IAM Policy to deploy a Jets application for your IAM user, check out [Minimal Deploy IAM Policy]({% link _docs/iam/deploy.md %}).
