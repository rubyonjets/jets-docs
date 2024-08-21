---
title: Docker and Private Repos
nav_text: Private Repos
category: dockerfile
order: 3
---

Jets builds your app with `docker build,` which eventually calls `bundle install.` The `bundle install` command runs within the docker build process. If your project's Gemfile has private repos, you need to provide access. This page shows you how to do so.

## CodeBuild Env Var

Configure the CodeBuild env with an SSM parameter. We're using an SSM param, so the token is redacted in the CodeBuild logs.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
  BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
}
```

Jets will use the `BUNDLE_GITHUB__COM` so that the `bundle install` can fetch the private repos.

## SSM Parameter Cheatsheet

To create an SSM parameter with the AWS CLI

 aws ssm put-parameter --name /dev/BUNDLE_GITHUB__COM --type SecureString --value "abc123"

Commands to get the parameter for confirmation.

    aws ssm describe-parameters | jq '.Parameters[].Name' | grep BUNDLE_GITHUB__COM
    aws ssm get-parameters --names /dev/BUNDLE_GITHUB__COM | jq '.Parameters[].Value'

## More Examples

SideKiq Pro and Gem Fury also require private gem repo access. Here's an example with them also.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
    BUNDLE_GEM__FURY__IO: "SSM:/#{ssm_env}/GEM_FURY_IO_TOKEN",
    BUNDLE_GEMS__CONTRIBSYS__COM: "SSM:/#{ssm_env}/GEMS_CONTRIBSYS_COM_TOKEN",
}
```

## Security Note

Your Gemfile should **not** use ENV to substitute the token in the Gemfile.

Example of a **bad** Gemfile.

```Gemfile
source "https://#{ENV['TOKEN']}:@gems.contribsys.com/"" do
  gem 'sidekiq-pro'
end
```

Example of a **good** Gemfile.

```Gemfile
source 'https://gems.contribsys.com/' do
  gem 'sidekiq-pro'
end
```

The bad Gemfile will save the secret token to `Gemfile.lock`. It's recommended to use the `BUNDLE_GITHUB__COM` env var to avoid this and accidentally commit secrets to your git repo. See: [GitHub Issue: Bundler should NOT include private credentials in Gemfile.lock from source urls in Gemfile](https://github.com/rubygems/bundler/issues/3609)
