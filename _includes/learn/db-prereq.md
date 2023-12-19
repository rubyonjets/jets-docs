To deploy to AWS Lambda, you'll need to create a database that AWS Lambda can access.  I suggest creating an RDS database for testing. Creating a database is outside of the scope of this guide, but here are some links that can help:

* [AWS Getting Started with RDS Docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html#CHAP_GettingStarted.Creating.MySQL)
* [BoltOps Learn RDS Console Video (requires subscription)](https://learn.boltops.com/courses/aws-console-guides/lessons/aws-rds-mysql-database-with-the-console)

Once you have an RDS database, let's review the `jets/config/env/.env`. There's a comment about how how SSM Parameters can be conventional loaded. The `DATABASE_URL` and `SECRET_KEY_BASE` ones are of interest.

jets/config/env/.env

    # DATABASE_URL=SSM # => SSM:/{{ include.project }}/dev/DATABASE_URL

The SSM value conventionally maps to `SSM:/{{ include.project }}/dev/DATABASE_URL` for `JETS_ENV=dev`

To create a SSM parameter with the aws cli.

    aws ssm put-parameter --name /{{ include.project }}/dev/DATABASE_URL --type SecureString --value "mysql2://user:pass@db.endpoint.us-west-2.rds.amazonaws.com/{{ include.project }}_dev?pool=5"

If you want to confirm that correct value

    aws ssm get-parameters --names /{{ include.project }}/dev/DATABASE_URL --with-decryption | jq -r '.Parameters[].Value'

You can also create the parameter with the AWS console if you prefer. Here's a useful [SSM Cheatsheet]({% link _docs/env/ssm/cheatsheet.md %}).

## Jets Dotenv

**Tip**: You can also use `jets dotenv` commands to set SSM values. [Jets Dotenv]({% link _docs/env/ssm.md %}) supports SSM.

    jets dotenv:set DATABASE_URL="mysql2://user:pass@db.endpoint.us-west-2.rds.amazonaws.com/{{ include.project }}?pool=5"
    jets dotenv:set SECRET_KEY_BASE=$(rails secret)
    jets dotenv:list --reveal

It will properly prefix the SSM Parameter names with `/{{ include.project }}/dev/`.

## Seeding Data

You'll need to also create the database and seed the RDS database with data. You can point the DATABASE_URL to the RDS db and run:

    rails db:create db:migrate db:seed

Next, we'll deploy to AWS Lambda.
