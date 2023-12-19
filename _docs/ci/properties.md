---
title: Jets CI CodeBuild Project Properties
nav_text: Properties
category: ci
order: 6
---

You can generally configure any of the AWS CodeBuild Project properties with:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ci.properties = {
    Description: "my description",
    QueuedTimeoutInMinutes: 60,
  }
end
```

See the [AWS::CodeBuild::Project](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-codebuild-project.html) reference docs for available properties.

Also see: [Debugging]({% link _docs/ci/debug.md %})
