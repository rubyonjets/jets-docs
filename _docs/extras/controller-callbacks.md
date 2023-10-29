---
title: Controller Callbacks
category: extras
order: 4
---

Controller Callbacks are methods that are run "before", "after" or "around" a controller action.

## before_action

```ruby
class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :delete]

private
  def set_post
    @post = Post.find(params[:id])
  end
end
```

## after_action

```ruby
class PostsController < ApplicationController
  after_action :format_post, only: [:show]

private
  def format_post
    @post.title.upcase
  end
end
```

## around_action

```ruby
class PostsController < ApplicationController
  around_action :benchmark

private
  def benchmark
    t1 = Time.now
    yield
    seconds = Time.now - t1
    puts "Action took #{seconds}s"
  end
end
```

## skip_before_action

```ruby
class ApplicationController < Jets::Controller::Base
  before_action :authenticate_user_session

  # ...


class PublicDocumentsController < ApplicationController
  # skip the authenticate_user_session for all the methods in the controller
  skip_before_action :authenticate_user_session

  # ...

class PostsController < ApplicationController
  # skip the authenticate_user_session only for the index method in the controller
  skip_before_action :authenticate_user_session, only: [:index]


```

## Supported Callbacks

These callbacks are supported:

    after_action
    append_after_action
    append_around_action
    append_before_action
    around_action
    before_action
    prepend_after_action
    prepend_around_action
    prepend_before_action
    skip_after_action
    skip_around_action
    skip_before_action

Jets Controller Callbacks are based on Rails Controller Callbacks. So the Rails docs are are useful:

* [Abstract Controller Callbacks](https://api.rubyonrails.org/classes/AbstractController/Callbacks.html)
* [Rails Guides ActionController Filters](https://guides.rubyonrails.org/action_controller_overview.html#filters)
