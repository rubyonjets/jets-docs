---
title: Lambda URL CloudFront Basic Auth
nav_text: Basic Auth
category: routing-lambda-cloudfront
order: 6
---

## CloudFront Basic Auth Support

You can enable Basic Auth for your Jets deployed app with:

config/jets/deploy/dev.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.function.basic_auth.enable = true
  config.lambda.url.cloudfront.function.basic_auth.username = "SSM" # /demo/dev/BASIC_AUTH_USERNAME
  config.lambda.url.cloudfront.function.basic_auth.password = "SSM" # /demo/dev/BASIC_AUTH_PASSWORD
end
```

Notice how the `SSM` value maps conventionally to an SSM parameter value in `/demo/dev/BASIC_AUTH_USERNAME.` You can control the conventions with [Env SSM Conventions]({% link _docs/env/ssm/conventions.md %}).

## Multiple Users

If you need multiple basic auth users. Here's how you can configure that.

config/jets/deploy/dev.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.function.basic_auth.enable = true
  config.lambda.url.cloudfront.function.basic_auth.credentials = "SSM" # /demo/dev/BASIC_AUTH_CREDENTIALS
end
```

The SSM parameter `/demo/dev/BASIC_AUTH_CREDENTIALS` can hold any of:

1. JSON Hash of users
2. JSON Array of users
3. String with one user

JSON Hash of users example

```json
{
  "bob": "cool",
  "kevin": "smart",
  "stuart": "funny"
}
```

JSON Array of users example

```json
["bob:cool"," kevin:smart", "stuart:funny"]
```

String with one user

    bob:cool

## Update Requires Deploy

When you update the SSM value, remember you have to deploy for the changes to take affect.

## Same Dev Credentials

One typical setup is to use the same basic auth credentials for all your dev or staging environments. Here's an example for that.

config/jets/deploy/dev.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.function.basic_auth.enable = true
  config.lambda.url.cloudfront.function.basic_auth.credentials = "SSM:/#{ssm_env}/BASIC_AUTH_CREDENTIALS" # /dev/BASIC_AUTH_CREDENTIALS
end
```

The app name is not included in the SSM value lookup. So the same basic auth credentials can be used for multiple apps.

## Protected Paths

You can configure specific paths to protect, instead of the entire app.

config/jets/deploy/dev.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.function.basic_auth.enable = true
  config.lambda.url.cloudfront.function.basic_auth.credentials = "SSM:/#{ssm_env}/BASIC_AUTH_CREDENTIALS" # /dev/BASIC_AUTH_CREDENTIALS
  config.lambda.url.cloudfront.function.basic_auth.protected_paths = ["/protected", "/admin*", "/pattern.*"]
end
```

The protected paths support exact matches, glob matches, and regexp matches. Note: Jets translates the strings to their Javascript code since the basic auth implementation is handled by a CloudFront Function, which only supports javascript.

Note: An empty `basic_auth.protected_paths = []` means no paths will be protected. A null path `basic_auth.protected_paths = nil` means all paths will be protected as if the path setting has not been set.

## More Examples

config/jets/deploy/dev.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.function.basic_auth.enable = true
  config.lambda.url.cloudfront.function.basic_auth.credentials = "SSM" # /demo/dev/BASIC_AUTH_CREDENTIALS

  # More examples
  # Conventional SSM name: one user
  # config.lambda.url.cloudfront.function.basic_auth.username = "SSM" # /demo/dev/BASIC_AUTH_USERNAME
  # config.lambda.url.cloudfront.function.basic_auth.password = "SSM" # /demo/dev/BASIC_AUTH_PASSWORD

  # Override to use a shared values for the dev env
  # config.lambda.url.cloudfront.function.basic_auth.username = "SSM:/#{ssm_env}/BASIC_AUTH_USERNAME"
  # config.lambda.url.cloudfront.function.basic_auth.password = "SSM:/#{ssm_env}/BASIC_AUTH_PASSWORD"

  # Conventional: supports multile users
  # config.lambda.url.cloudfront.function.basic_auth.credentials = "SSM" # /demo/dev/BASIC_AUTH_CREDENTIALS

  # Override to use a shared values for the dev credentials
  # config.lambda.url.cloudfront.function.basic_auth.credentials = "SSM:/#{ssm_env}/BASIC_AUTH_CREDENTIALS"

  # Hard-coded values also supported. Though not encouraged.
  # config.lambda.url.cloudfront.function.basic_auth.credentials = ["user:pass", "user2:pass2"]
  # config.lambda.url.cloudfront.function.basic_auth.credentials = {user: "pass", user2: "pass2"}
  # config.lambda.url.cloudfront.function.basic_auth.credentials = "user:pass"
end
```

## Why CloudFront for Basic Auth?

Why does Jets use CloudFront to handle Basic Auth instead of the traditional handling at app level?

This is because Lambda Function URLs will remap the `WWW-Authenticate` response header sent from your app to `X-Amzn-Remapped-WWW-Authenticate`. This is a known limitation of Lambda URLs. See:

* [Amazon API Gateway Known Issues](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html): Also applies to Lambda Function URLs.
* [Getting "x-amzn-Remapped-WWW-Authenticate instead of WWW-Authenticate and jetty client not able to recognise](https://stackoverflow.com/questions/58037317/getting-x-amzn-remapped-www-authenticate-instead-of-www-authenticate-and-jetty)
* Also, sending a `www-authenticate` header (CloudFront headers are lowercase) to CloudFront results in it not calling any custom viewer-response CloudFront Function at all. So you have to do some trickery with mapping to a `custom-www-authenticate` and then mapping it back in the viewer-response CloudFront Function. It's complex.
* People have been able to use Lambda@Edge but those functions introduce another layer of complexity. IE: They can only be deployed to us-east-1.

Note, all the points above means you cannot use Rails Basic Auth [http_basic_authenticate_with](https://api.rubyonrails.org/classes/ActionController/HttpAuthentication/Basic.html). AWS Lambda URLs and CloudFront won't work with it. Instead, use the Jets provide Basic Auth support config.

Jets uses a view-request CloudFront Function to handle it at the point of entry into CloudFront. If the Basic Auth credentials provided by the user is not correct, it **never** hits your origin or Lambda Function. This is actually ideal anyway.
