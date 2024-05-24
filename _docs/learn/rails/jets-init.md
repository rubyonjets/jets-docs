---
title: Jets Init
search_title: Rails Jets Init Setup
category: learn-rails
order: 3
---

{% include videos/learn/getting-started/rails.md %}

## Jets Install

To install jets for Rails add these to gems to your `Gemfile`

Gemfile

```ruby
gem "jets-rails", ">= 1.1"
gem "jets", ">= 6.0"
```

And run

    bundle install

## Jets Init

To generate jets config files that help deploy the Rails project to AWS Lambda, run:

    jets init

Starter [config/jets]({% link _docs/config/jets.md %}) files are generated.

{% include learn/jets-init-files.md learn=true framework="rails" %}

{% include learn/jets-init-review-config.md project="rails" framework="rails" %}
