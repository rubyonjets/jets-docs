---
title: Jets CI Triggers
nav_text: Triggers
category: ci
order: 3
---

The `ci.triggers` setting sets up a hook with the git provider to automatically start a build upon a `git push`. Here's a simple example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ci.triggers = true
end
```

Jets expands out the `config.ci.triggers = true` setting to something a `Triggers.FilterGroups` property that listens to default branch, usually `main` or `master`. Example:

```yaml
Resources:
  Codebuild:
    Type: AWS::CodeBuild::Project
    # ...
    Properties:
      Triggers:
        FilterGroups:
          - - Type: HEAD_REF
              Pattern: main
            - Type: EVENT
              Pattern: PUSH
        Webhook: true
```

## Branches

You can specify the branch to trigger a CI run by specifying the branch name instead of a boolean. Example:

```ruby
config.ci.triggers = "my-branch"
```

Remember to deploy the CI project settings.

    jets ci:deploy

You can also specify multiple branches with

```ruby
config.ci.triggers = ["branch1", "branch2"]
```

## General Form

The general form for setting triggers is an Array of Arrays. Yes, it's 2 level of Arrays.

```ruby
config.ci.triggers = [
  [{Type: "HEAD_REF", Pattern: "feature1"}, {Type: "EVENT", Pattern: "PUSH"}],
  [{Type: "HEAD_REF", Pattern: "feature2"}, {Type: "EVENT", Pattern: "PUSH"}]
]
```

This maps directly to the [CodeBuild CloudFormation Triggers.FilterGroups structure](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codebuild-project-projecttriggers.html).

## Reference Cheatsheet

Here's a cheatsheet of examples:

```ruby
config.ci.triggers = true
config.ci.triggers = "my-branch"
config.ci.triggers = ["branch1", "branch2"]
config.ci.triggers = [
  [{Type: "HEAD_REF", Pattern: "feature1"}, {Type: "EVENT", Pattern: "PUSH"}],
  [{Type: "HEAD_REF", Pattern: "feature2"}, {Type: "EVENT", Pattern: "PUSH"}]
]
```
