---
title: Jets Custom Upcase Renderer
nav_text: Upcase
category: howtos-renderers
order: 2
---

Here's a cheatsheet for the simplest custom renderer ever that simply does an upcase.

## Setup Template Handler

To add a custom render, you can register new template handlers. This is typcially done in the initializer.

config/initializers/renderers.rb

```ruby
class UppercaseRenderer
  def self.call(template, source = nil)
    source ||= template.source
    source.upcase.inspect
  end
end

ActionView::Template.register_template_handler(:upcase, UppercaseRenderer)
```

## Use in View

app/views/examples/index.html.upcase

    This text will be rendered in upcase.

{% include howtos/renderers/controller-and-routes.md %}
