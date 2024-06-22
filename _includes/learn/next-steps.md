Here are some next steps to learn more about Jets.

## Video Tutorials and Demos

* [CloudFront CDN for Lambda Function URL](https://learn.boltops.com/curriculums/ruby-on-jets/courses/ruby-on-jets-6-0-guide/lessons/cloudfront-cdn-for-lambda-function-url): This allows you to use a user-friendly domain instead of the randomly generated Lambda Function URL.
* [REPL on AWS Lambda jets exec](https://learn.boltops.com/curriculums/ruby-on-jets/courses/ruby-on-jets-6-0-guide/lessons/jets-exec-repl-on-aws-lambda): An interactive REPL console that allows you to run bash commands in a deployed AWS Lambda Function environment. This can be helpful for debugging.
* [How AWS Lambda Scaling Works: jets concurrency](https://learn.boltops.com/curriculums/ruby-on-jets/courses/ruby-on-jets-6-0-guide/lessons/how-aws-lambda-scaling-works-jets-concurrency): With AWS Lambda, you don't worry about whether you can scale. You worry about scaling too much. Jets has built-in reasonable defaults as a safety measure. Learn how you can tune them.
* [Jets Dotenv CLI Command](https://learn.boltops.com/curriculums/ruby-on-jets/courses/ruby-on-jets-6-0-guide/lessons/jets-dotenv-cli-command): The dotenv commands can be used to check your SSM parameter values and confirm they look good before deployment.
* [Jets Env CLI Command](https://learn.boltops.com/curriculums/ruby-on-jets/courses/ruby-on-jets-6-0-guide/lessons/jets-env-cli-command): The env commands allow you to get and set live env vars on the Lambda functions. It's also useful for debugging.

## Learn More About What Jets Can Do

* [Config Jets]({% link _docs/config/jets.md %}): Learn about the different configs you can use to control how Jets deploys.
* [Env Files]({% link _docs/env.md %}): Use env files to manage and set secrets.
* [CloudFront Lambda]({% link _docs/routing/lambda/cloudfront/distribution.md %}): Create a CDN CloudFront distribution in front of your Lambda function for a friendly URL with only a few configs. It also provides layer 3-4 protection against known malicious traffic.
* [Reserved Concurrency]({% link _docs/config/concurrency.md %}): Tune the maximum number of concurrent lambdas you want to allow for scaling. You can increase concurrency if you have pages that make many parallel requests, IE: large photo galleries. Jets sets reasonable defaults as a safety measure. You can also use Provisioned concurrency to have always-running Lambdas.
* [Jets Exec]({% link _docs/debug/jets-exec.md %}): Explore and debug the Lambda environment by sending it bash commands in a REPL.
* [Jets Release History]({% link _docs/debug/jets-release.md %}): Track deployments and rollback to previous versions when needed.

## And There a Lot More Jets Can Do

* [IAM Policies]({% link _docs/iam/app/iam-policies.md %}): Control what AWS resources you want your app to have. IE: S3, SNS, etc.
* [Managed IAM Policies]({% link _docs/iam/app/managed-policies.md %}): Use AWS Managed IAM Policies for your app.
* [Assets Serving CDN]({% link _docs/assets.md %}): Create another CloudFront distribution optimized for serving assets. Jets automatically compiles assets, uploads them to s3, and configures your app to use them.
* [Uploads CDN]({% link _docs/uploads/cloudfront.md %}): If your app has file or image uploads, Jets can create a CloudFront distribution using your existing uploads s3 bucket and serve those files.
* [WAF]({% link _docs/waf.md %}): Web Application Firewall can be used to mitigate traffic from DDOS attacks. Jets provides additional custom rules like a Blanket Rate Limiter that's fundamental to fighting DDOS.
* [Jets Jobs]({% link _docs/jobs.md %}): Learn how Jets can take your existing Rails jobs and use them as-is with the `jets_job` ActiveJob adapter by automatically creating serverless resources like Lambda functions and SQS queues. Jets also converts sidekiq scheduler items to serverless resources like CloudWatch scheduled event rules.
* [Jets Events]({% link _docs/events.md %}): Glue any event from [CloudWatch Log]({% link _docs/events/cloudwatch-log.md %}), [CloudWatch Rule]({% link _docs/events/cloudwatch-rule.md %}), [DynamoDB]({% link _docs/events/dynamodb.md %}), [IoT]({% link _docs/events/iot.md %}), [Kinesis]({% link _docs/events/kinesis.md %}), [S3]({% link _docs/events/s3.md %}), [Scheduled]({% link _docs/events/scheduled.md %}), [SNS]({% link _docs/events/sns.md %}), [SQS]({% link _docs/events/sqs.md %}) to Lambda functions seamlessly.

That's just the tip of the iceberg.
