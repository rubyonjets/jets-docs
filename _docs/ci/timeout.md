---
title: Jets CI CodeBuild Timeout
nav_text: Timeout
category: ci
order: 5
---

You can configure CI run timeout with:

Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ci.timeout_in_minutes = 30
end
```

The default is 30 minutes. Note, `config.ci.timeout` also works.
