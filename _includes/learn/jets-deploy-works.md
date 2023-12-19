## How Jets Deployment Works

1. Jets first creates a bootstrap stack to create an S3 bucket and CodeBuild project.
2. It packages up your code to a zip file and uploads it S3 for deployment.
2. The rest of the deploy runs on the [CodeBuild Remote Runner]({% link _docs/remote.md %}). It analyzes your source code, uses Docker to build dependencies, and deploys with CloudFormation to your AWS account.

Serverless Resources like AWS Lambda Functions, CloudWatch [Event Rules]({% link _docs/events/scheduled.md %}), [CloudFront Distributions]({% link _docs/routing/lambda/cloudfront/distribution.md %}), [SQS Job Queues]({% link _docs/jobs.md %}) are created based on what you've configured. At the end, you see an AWS Lambda Function URL that points to your deployed app.

**Tip**: For faster deploys, you can use a [Remote Docker Daemon]({% link _docs/remote/codebuild/docker-host.md %}) or [CodeBuild Fleets]({% link _docs/remote/codebuild/fleet.md %}). This speeds up the build times since Docker caches can be reused.

## Release History

A release record is created at the end of the deployment. You can see the release history with:

    ❯ jets release:history
    Releases for stack: {{ include.project }}-dev
    +---------+-----------------+---------------+---------+
    | Version |     Status      |  Released At  | Message |
    +---------+-----------------+---------------+---------+
    | 1       | UPDATE_COMPLETE | 8 minutes ago | Deploy  |
    +---------+-----------------+---------------+---------+

For detailed information about each release you can also use `jets release:info`. You can also rollback to previous code and infrastructure with `jets rollback` if needed.

Next, we'll review the deployed project.
