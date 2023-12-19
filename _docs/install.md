---
title: Installation
---

## RubyGems

Install jets via RubyGems.

    gem install jets

### Ruby

Jets supports Ruby 3.2.

Interestingly, Jets can use Ruby version. This is thanks to the Lambda Docker image package type. Jets will use whateve Ruby version your project is using. If you're using the Lambda zip package type, then only the official AWS Lambda Ruby Runtimes are supported. That's current 2.7 and 3.2

### AWS and IAM Permissions

The IAM user you use to run the `jets deploy` command needs a minimal set of IAM policies in order to deploy a Jets application. Follow the [Minimal Deploy Policy IAM Policy]({% link _docs/iam/deploy.md %}) to create the policy, group, and user. Use the user's credentials to configure the `aws-cli` above.
