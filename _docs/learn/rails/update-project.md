---
title: Update Project
search_title: Update Project API
category: learn-rails
order: 9
---

{% include videos/learn/getting-started/rails.md %}

## Code Changes

Let's update the code and deploy again. We'll add a `puts "debug 1"`.

app/controllers/posts_controller.rb

```ruby
class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    puts "debug 1" # <= ADD THIS LINE
    @posts = Post.all
  end

  # ....
end
```

## Deploy Again

To deploy again run `jets deploy`.

    ❯ jets deploy
    Will deploy rails-dev
    Are you sure? (y/N) y
    ...
    Stack success status: UPDATE_COMPLETE
    Release 2: https://www.rubyonjets.com/projects/rails/releases/release-Ke5vdy0SPtEYdogu
    Prewarming application
    Lambda Url https://57jv6mkzj3su2buias5uuop6uy0ogvqr.lambda-url.us-west-2.on.aws

Once changes have been deployed, confirm code changes.

## Jets Logs

You can also use the [jets logs]({% link _reference/jets-logs.md %}) command to tail the logs in your terminal.

    ❯ jets logs -f
    I, [2024-04-10T11:38:48.154729 #8]  INFO -- : [54f41da9-2fa3-4fe1-b52e-44c33392dc79] Started GET "/" for 2002:42ea:d0d2:0:cde7:a469:c823:3c7d at 2024-04-10 11:38:48 +0000
    I, [2024-04-10T11:38:48.156409 #8]  INFO -- : [54f41da9-2fa3-4fe1-b52e-44c33392dc79] Processing by PostsController#index as HTML
    debug 1
    I, [2024-04-10T11:38:48.265264 #8]  INFO -- : [54f41da9-2fa3-4fe1-b52e-44c33392dc79]   Rendered layout layouts/application.html.erb (Duration: 102.8ms | Allocations: 16418)
    I, [2024-04-10T11:38:48.265750 #8]  INFO -- : [54f41da9-2fa3-4fe1-b52e-44c33392dc79] Completed 200 OK in 109ms (Views: 96.3ms | ActiveRecord: 8.8ms | Allocations: 18012)

**Note**: The [jets logs]({% link _reference/jets-logs.md %}) command use the controller Lambda Function Log Group, IE: `/aws/lambda/rails-dev-controller` by default, so we do not have to specify the `-n` option.

Next, we'll delete the project.
