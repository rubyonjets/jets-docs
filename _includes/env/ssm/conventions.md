## Autoload Convention Path

Jets will autoload SSM parameters under the path of `/PROJECT/ENV/`. This means SSM parameters like

    /demo/dev/DATABASE_URL
    /demo/dev/SECRET_KEY_BASE

All you have to do is create them in AWS SSM parameter store, and they are automatically loaded. So the `config/jets/env/.env` is entirely optional. This behavior can be configured with:

config/jets/project.rb

```ruby
Jets.project.configure do
  config.dotenv.ssm.autoload = true # default: true
end
```

This spares you from updating your `config/jets/env` files with newly added SSM parameters. Here's a useful CLI command to see what values are in SSM.

    ❯ aws ssm get-parameters-by-path --path "/demo/dev/" | jq -r '.Parameters[].Name' | sort
    /demo/dev/DATABASE_URL
    /demo/dev/SECRET_KEY_BASE

For those who prefer more control over the SSM env variables, you can turn off the behavior and use explicit `jets/config/env` files. If you using both, the explicit values always win.

Note: Jets uses the optimized [get_parameters_by_path](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/SSM/Client.html#get_parameters_by_path-instance_method) API call. It efficiently retrieves multiple parameters that share a path hierarchy. This minimizes API calls compared to fetching parameters individually and avoids rate limit issues. The implementation does not use the recursive option by design, so the parameters should be within the same hierarchy level.
