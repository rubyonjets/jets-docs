ci.env.vars | {} | Env vars for the CI runner. The `JETS_API_TOKEN` is required.  You probably want `BUNDLE_GITHUB__COM` also.
ci.iam.default_managed_policy | %w[AmazonSSMReadOnlyAccess AWSLambda_ReadOnlyAccess] | Override default Jets CI Managed IAM policy. Be careful overriding, you may remove required permissions.
ci.iam.default_policy | %w[cloudformation codebuild ecr ecr-public iam logs s3] | Override default Jets CI IAM policy. Be careful overriding, you may remove required permissions.
ci.iam.managed_policy | [] | CI Managed IAM Policy to add to the default Jets IAM policy.
ci.iam.policy | [] | CI Custom IAM Policy to add to the Jets default IAM policy.
ci.project.properties | {} | Properties to override for the CI [CodeBuild Project](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codebuild-project.html) runner.
ci.schedule.cron | nil | How often to schedule the CI run. Second highest precedence, over rate. IE: "0 12 * * ? *". See: [AWS Docs Scheduled Expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html)
ci.schedule.enable | false | Enable Scheduled CI runs via Scheduled Event Rule.
ci.schedule.expression | nil | How often to schedule the CI run. Highest precedence, over cron and rate. Full expression. IE: "cron(0 12 * * ? *)". See: [AWS Docs Scheduled Expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html)
ci.schedule.rate | nil | How often to schedule the CI run. Lowest precedence, lower than expression and rate. IE: "1 day". See: [AWS Docs Scheduled Expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html)
ci.source | {} | Required. Repo source. IE: `{Type: "GITHUB", Location: "https://github.com/ORG/REPO"}`
ci.timeout_in_minutes | 60 | CI Runner timeout. You can also use `ci.timeout` for shorthand. It's still in minutes.