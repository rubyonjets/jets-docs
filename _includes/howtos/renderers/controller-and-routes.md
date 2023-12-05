## Controller

app/controllers/examples_controller.rb

```ruby
class ExamplesController < ApplicationController
  def index
  end
end
```

## Routes

config/routes.rb

```ruby
Jets.application.routes.draw do
  get "/examples", to: "examples#index"
end
```
