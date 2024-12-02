---
title: "Jets Config: Project, Bootstrap, Deploy"
nav_text: Jets
category: config
order: 1
---

The `config/jets` folder has your Jets settings. It tells Jets how to deploy.

{% include learn/jets-init-files.md %}

## Config Project

{% include learn/config-jets-project.md project="demo" %}

## Config Bootstrap

{% include learn/config-jets-bootstrap.md %}

## Config Deploy

{% include config/deploy-rb.md %}

## Config Env Files

Jets supports dotenv files in the `config/jets/env` files. They are designed for deployment and introduce a few extra features like SSM parameter store support. For more info: [Env Files]({% link _docs/env.md %})

## Config Dev vs Prod

You can also use separate config files for dev and prod. Here's an example.

config/jets/deploy/dev.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "dev.example.com", region: "us-east-1")
end
```

config/jets/deploy/prod.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")
end
```

## Load Order

The config files load in the following order:

    config/jets/project.rb
    config/jets/bootstrap.rb
    config/jets/deploy.rb

## Client vs Remote Loading

Understanding when jets loads `config/jets` files can be useful.

* The `project.rb` and `bootstrap.rb` are loaded on the client-side jets deploy.
* The `project.rb`, `bootstrap.rb`, and `deploy.rb` are all loaded on the remote-side jets-remote deploy.

To add clarity, when you run

    jets deploy

That handles the **client-side** deploy. The `jets deploy` loads `project.rb` and `bootstrap.rb`. Then `jets deploy` starts up a remote runner and ultimately calls.

    jets-remote deploy

The **remote-side** deploy loads all 3 config files: `project.rb`, `bootstrap.rb`, and `deploy.rb`.

## Separate of Concerns

Jets only loads `deploy.rb` on the remote runner to separate concerns. The design allows separate limited AWS IAM permissions for the client vs remote jets deploy. This is particularly helpful when using jets helpers for a more human-readable config. Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")
end
```

IE: The `acm_cert_arn` helper requires AWS Cert Manager IAM permissions, which only need to be granted to the remote runner vs on the lightweight jet local client.

These separate `projects.rb`, `bootstrap.rb`, and `deploy.rb` configs allow Jets to control load order finely. This is particularly useful for some items that must be loaded extremely early in the boot process, like `project.rb`. This removes the need for clunky double parsing that existed in previous versions before Jets 6.
