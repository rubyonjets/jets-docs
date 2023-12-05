## How Deployment Works

1. Jets bundles up your code to a zip file and uploads it s3 for deployment.
2. Jets uses precompiled gems for the deployment package from Jets Pro.
3. Jets analyzes your source code to generate CloudFormation templates. CloudFormation deploys the resources like AWS Lambda functions.

## Jets Pro

The [Jets Framework](/) itself is open source and free to use. [Jets Pro]({% link _docs/pro.md %}) is an paid service that provides additional features. By default, Jets Pro is used anonymously but is rate-limited. You can disable it. However, you must create and manage a Custom Lambda Layer for precompiled gems. You won't also get access to a dashboard, release history, and the ability to rollback releases.
