## Database Prerequisite

To deploy to AWS Lambda, you'll need to create a database that AWS Lambda can access.  I suggest creating an RDS database for testing. Creating a database is outside of the scope of this guide, but here are some links that can help:

* [AWS Getting Started with RDS Docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html#CHAP_GettingStarted.Creating.MySQL)
* [BoltOps Learn RDS Console Video (requires subscription)](https://learn.boltops.com/courses/aws-console-guides/lessons/aws-rds-mysql-database-with-the-console)

Once you have an RDS database, create a `.env.development` file and configure a DATABASE_URL environment variable.

.env.development

    DATABASE_URL="mysql2://user:pass@db-1.ckbnyxs6b4a8.us-west-2.rds.amazonaws.com/demo_development?pool=5"

**Tip**: You can also store the DATABASE_URL value more securely in an SSM Parameter on the AWS account or use `jets credentials:edit` store in an encrypted file. We're keeping things simple this guide.

Once this is set up we deploy to AWS Lambda.
