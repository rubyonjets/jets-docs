AWS Systems Manager Parameter Store is also supported.  Jets dotenv files support referencing SSM Parameter Store values. This behavior only applies to Jets `config/jets/env` files.

Storing secrets as SSM Parameters and referencing them your `.env` files allows you to commit your `.env` into source control. When you reference a parameter name with it will prefix the conventional `/<APP>/<JETS_ENV>/`. If you reference the parameter name with a leading / then the conventional prefix is not added. For example:

    RELATIVE_DATABASE_URL=SSM:database-url          # references /<APP>/<JETS_ENV>/database-url
    ABSOLUTE_DATABASE_URL=SSM:/path/to/database-url # references /path/to/database-url

The SSM parameters are fetched and interpolated into your environment at build time so make sure to re-deploy your app after making changes to your SSM parameters to ensure they are picked up correctly.

## Conventional SSM Value

Additionally, if the value is `SSM`. It will conventionally map to `/<APP>/<JETS_ENV>/KEY`.

    MY_SECRET=SSM # references /<APP>/<JETS_ENV>/MY_SECRET
    MySecret=SSM  # references /<APP>/<JETS_ENV>/MySecret
