## Convention Path Loading

For the most part, you do not need `config/jets/env` files to explicitly declare the values. Jets can conventionally load env vars by conventional SSM path, IE: `/demo/dev` or `/demo/prod`. Here's an example.

    ❯ aws ssm describe-parameters | jq -r '.Parameters[].Name' | grep '/demo/dev/' | sort
    /demo/dev/DATABASE_URL
    /demo/dev/SECRET_KEY_BASE

Since the `DATABASE_URL` and `SECRET_KEY_BASE` parameters are underneath the `/demo/dev/` SSM Parameter path, they will be load automatically. Here's what the file would look like

config/jets/env/.env

    DATABASE_URL=SSM
    SECRET_KEY_BASE=SSM

Thanks to conventions, `.env` file above is **optional**. You only need a `.env` file if you have non-conventional parameters paths. To see what SSM values `config/jets/env` files will resolve to you can use.

    > jets dotenv:list
    DATABASE_URL=mysql2://user:pass@host.com/dbname?pool=5

If you want to learn more about the SSM conventions including how to control the behavior see: [Jets Dotenv SSM Conventions]({% link _docs/env/ssm/conventions.md %}).
