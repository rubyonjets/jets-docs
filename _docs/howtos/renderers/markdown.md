---
title: Jets Custom Markdown Renderer
nav_text: Markdown
category: howtos-renderers
order: 1
---

Here's a cheatsheet that shows you how to add and use a custom renderer. We'll use markdown as an example.

## Gemfile

We'll use the `redcarpet` gem. Add it to your `Gemfile`.

Gemfile

```ruby
gem "redcarpet"
```

## Setup Template Handler

To add a custom render, you can register new template handlers. This is typcially done in the initializer.

config/initializers/renderers.rb

```ruby
require 'renderers/markdown_renderer'
ActionView::Template.register_template_handler(:md, Renderers::MarkdownRenderer)
ActionView::Template.register_template_handler(:markdown, Renderers::MarkdownRenderer)
```

## MarkdownRenderer Class

Here's the MarkdownRenderer definition.

lib/renderers/markdown_renderer.rb

```ruby
module Renderers
  class MarkdownRenderer
    def self.call(template, text = nil)
      text ||= template.source
      renderer = Redcarpet::Render::HTML.new
      markdown = Redcarpet::Markdown.new(renderer)
      markdown.render(text).html_safe.inspect
    end
  end
end
```

## Use in View

app/views/examples/index.html.md

```markdown
## Title 1

This text will be rendered in markdown.
```

{% include howtos/renderers/controller-and-routes.md %}
