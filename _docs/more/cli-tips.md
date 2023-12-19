---
title: Jets CLI Tips
nav_text: CLI Tips
category: more
order: 4
---

Jets tries to provide some tips that are helpful to the user.

You can disable these **all** of the tip messages with:

config/jets/project.rb

```ruby
Jets.project.configure do
  config.tips.enable = false
end
```

You can also selectively disable specific tips:

config/jets/project.rb

```ruby
Jets.project.configure do
  config.tips.concurrency_change = false
  config.tips.env_change = false
  config.tips.faster_deploy = false
  config.tips.ssm_change = false
end
```
