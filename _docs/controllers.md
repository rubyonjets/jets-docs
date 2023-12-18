---
title: Controllers
---

A Jets controller handles a web request and renders a response. Here's an example:

app/controllers/posts_controller.rb:

```ruby
class PostsController < ApplicationController
  def index
    # renders Lambda Proxy structure compatible with API Gateway
    render json: {hello: "world", action: "index"}
  end

  def show
    id = params[:id] # params available
    # puts goes to the lambda logs
    puts event # raw lambda event available
    render json: {action: "show", id: id}
  end
end
```

Helper methods like `params` provide transparent access to the request parameters encoded in the API Gateway event.  The `render` method automatically adapts the response to the Lambda Proxy structure that API Gateway understands.

Jets creates one Lambda function to handle the all the controller requests. This keeps debugging simple and helps with prewarming. 

