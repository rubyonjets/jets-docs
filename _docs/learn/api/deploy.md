---
title: Deploy Project
search_title: Deploy Project API
category: learn-api
order: 7
---

## Database Prerequsite

In order to deploy to AWS Lambda, you'll need to create a database that AWS Lambda can access.  I suggest creating a RDS database for testing. Creating a database is outside of scope for this guide, but here are some links that can help:

* [AWS Getting Started with RDS Docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html#CHAP_GettingStarted.Creating.MySQL)
* [BoltOps Learn RDS Console Video (requires subscription)](https://learn.boltops.com/courses/aws-console-guides/lessons/aws-rds-mysql-database-with-the-console)

Once you have a RDS database, let's create a `.env.development` file and configure a DATABASE_URL environment variable.

.env.development

    DATABASE_URL="mysql2://user:pass@db-1.ckbnyxs6b4a8.us-west-2.rds.amazonaws.com/demo_development?pool=5"

**Tip**: You can also store the DATABASE_URL value more securely in an SSM Parameter on the AWS account or use `jets credentials:edit` store in an encrypted file. In this guide we're keeping things simple for learning.

Once this is set up we deploy to AWS Lambda.

## Adjust Logging Event

Let's change `config.logging.event = true` so event payloads will be logged on AWS lambda.

config/environments/development.rb

```ruby
Jets.application.configure do
  config.logging.event = true # <= CHANGE
  # ...
end
```

Note: With `JETS_ENV=production`, the `config.logging.event = true` is by default. We're overriding the `JETS_ENV=development` behavior.

## Deploy

Let's go ahead and deploy the project to AWS Lambda.

    $ jets deploy

Here's `jets deploy` command with some output:

    ❯ jets deploy
    Deploying to Lambda demo-dev app...
    Building CloudFormation templates
    Deploying CloudFormation stack with jets app!
    09:50:35PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    ...
    09:51:58PM CREATE_COMPLETE AWS::CloudFormation::Stack JetsPreheatJob
    09:52:00PM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack demo-dev
    09:52:00PM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE
    Time took: 1m 26s
    Prewarming application.
    API Gateway Endpoint: https://2bmdurd1ra.execute-api.us-west-2.amazonaws.com/dev/

{% include learn/jets-pro.md %}

Next, we'll review the deployed project.
