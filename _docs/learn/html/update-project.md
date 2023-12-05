---
title: Update Project
search_title: Update Project API
category: learn-html
order: 9
---

{% include videos/learn/getting-started/html.md %}

{% include learn/update-project-lambda-console-edit.md mode="html" %}

## Jets Logs

You can also use the [jets logs]({% link _reference/jets-logs.md %}) command to tail the logs in your terminal.

    ❯ jets logs -f
    2023-10-29 18:28:02 UTC INIT_START Runtime Version: ruby:3.2.v9 Runtime Version ARN: arn:aws:lambda:us-west-2::runtime:b96ddb9b1905c3979339d7706a5f7cfda1d851593b1255eb0f15ff573c17fd28
    2023-10-29 18:28:04 UTC START RequestId: 8415926a-3a58-4cbc-98cb-a8f87e008e47 Version: $LATEST
    2023-10-29 18:28:04 UTC Started GET "/" for 70.132.18.80 at 2023-10-29 18:28:04 +0000
    2023-10-29 18:28:04 UTC Processing Jets::WelcomeController#index
    2023-10-29 18:28:04 UTC   Rendering /opt/ruby/gems/3.2.0/bundler/gems/jets-3941d8f7e00f/engines/internal/app/views/jets/welcome/index.html.erb
    2023-10-29 18:28:04 UTC   Rendered /opt/ruby/gems/3.2.0/bundler/gems/jets-3941d8f7e00f/engines/internal/app/views/jets/welcome/index.html.erb (Duration: 5.4ms | Allocations: 13670)
    2023-10-29 18:28:04 UTC Completed Status Code 200 in 0.041s
    2023-10-29 18:28:04 UTC END RequestId: 8415926a-3a58-4cbc-98cb-a8f87e008e47
    2023-10-29 18:28:04 UTC REPORT RequestId: 8415926a-3a58-4cbc-98cb-a8f87e008e47  Duration: 144.73 ms     Billed Duration: 145 ms Memory Size: 1536 MB   Max Memory Used: 168 MB  Init Duration: 2361.75 ms
    2023-10-29 18:28:05 UTC START RequestId: 0e483ed2-c7c9-43e3-babb-7c165c9a3365 Version: $LATEST
    2023-10-29 18:28:05 UTC Started GET "/posts" for 70.132.18.147 at 2023-10-29 18:28:05 +0000
    2023-10-29 18:28:05 UTC Processing PostsController#index
    2023-10-29 18:28:05 UTC   Parameters: {"catchall":"posts"}
    2023-10-29 18:28:05 UTC debugging post#index called
    2023-10-29 18:28:05 UTC   Rendering layout layouts/application.html.erb
    2023-10-29 18:28:05 UTC   Rendering posts/index.html.erb within layouts/application
    2023-10-29 18:28:06 UTC   Rendered posts/index.html.erb within layouts/application (Duration: 140.2ms | Allocations: 10015)
    2023-10-29 18:28:06 UTC   Rendered layout layouts/application.html.erb (Duration: 179.9ms | Allocations: 22792)
    2023-10-29 18:28:06 UTC Completed Status Code 200 in 0.661s
    2023-10-29 18:28:06 UTC END RequestId: 0e483ed2-c7c9-43e3-babb-7c165c9a3365
    2023-10-29 18:28:06 UTC REPORT RequestId: 0e483ed2-c7c9-43e3-babb-7c165c9a3365  Duration: 726.32 ms     Billed Duration: 727 ms Memory Size: 1536 MB   Max Memory Used: 180 MB

The [jets logs]({% link _reference/jets-logs.md %}) command will use the Log Group from the controller Lambda function, IE: `/aws/lambda/demo-dev-controller`, so we do not have to specify the name as we did in the [Jets Project Job Learn Guide]({% link _docs/learn/job/update-project.md %}#jets-logs).

## Update Code and Deploy Changes

So far, we have been making manual changes. We should codify the changes. To help see the changes, let's make some additional changes so that it's easy to check.

app/controllers/posts_controller.rb

```ruby
class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    puts "debugging again posts#index called"
    @posts = Post.all

    render json: @posts
  end

  # ....
end
```

Deploy again

    ❯ jets deploy
    Deploying to Lambda demo-dev app...
    ...
    06:31:11PM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE
    Time took: 1m 6s
    Prewarming application.
    API Gateway Endpoint: https://spsfc098x8.execute-api.us-west-2.amazonaws.com/dev/

Once changes have been deployed, confirm Lambda Source code changes.

![](https://img.boltops.com/tools/jets/learn/html/update-project-confirm-lambda-changes.png)

If you still have [jets logs]({% link _reference/jets-logs.md %}) running in a terminal, you'll see logs tailing as you're testing.

Next, we'll delete the project.
