---
title: Update Project
search_title: Update Project API
category: learn-rack
order: 9
---

{% include learn/update-project-lambda-console-edit.md framework="rack" %}

## Update Code and Deploy Changes

So far, we have been making manual changes. We should codify the changes. To help see the changes, let's make some additional changes so that it's easy to check.

app.rb

```ruby
class App
  def self.call(env)
    puts "debug 2"
    text = "hello from rack"
    puts "#{Time.now}: #{text}"
    headers = {"Content-Type" => "text/plain"}
    body = [text]
    status = 200
    [status, headers, body]
  end
end
```

{% include learn/update-project-deploy-again.md framework="rack" %}