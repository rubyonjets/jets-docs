---
title: Jets CI Source Version
nav_text: Source Version
category: ci
order: 2
---

The default branch that the CI CodeBuild project will use for your source code can be configured with `config.ci.source_version`. Example:

config/jets/ci.rb

```ruby
Jets.deploy.configure do
  config.ci.source_version = "master"
end
```

This is the default branch. If you are starting a CI run manually, you can override the default with the `--branch` option.

    jets ci:start --branch feature1
