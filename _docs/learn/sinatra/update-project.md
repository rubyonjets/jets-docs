---
title: Update Project
search_title: Update Project API
category: learn-sinatra
order: 9
---

{% include learn/update-project-lambda-console-edit.md framework="sinatra" %}

## Update Code and Deploy Changes

So far, we have been making manual changes. We should codify the changes. To help see the changes, let's make some additional changes so that it's easy to check.

app.rb

```ruby
require "sinatra/base"
require "jets-sinatra"

class App < Sinatra::Base
  get "/" do
    puts "debug 2"
    text = "hello from sinatra"
    puts "#{Time.now}: #{text}"
    text
  end
end
```

{% include learn/update-project-deploy-again.md framework="sinatra" lambda_url="https://aodietp35hnzkz7xpjx27cdxlu0zzzld.lambda-url.us-west-2.on.aws" %}
