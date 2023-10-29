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
