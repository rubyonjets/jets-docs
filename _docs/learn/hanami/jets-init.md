---
title: Jets Init
search_title: Hanami Jets Init Setup
category: learn-hanami
order: 3
---

## Jets Install

To install jets for Hanami add these to gems to your `Gemfile`

Gemfile

```ruby
gem "jets", ">= 6.0"
```

And run

    bundle install

## Jets Init

To generate jets config files that help deploy the Hanami project to AWS Lambda, run:

    jets init

That generates the starter [config/jets]({% link _docs/config/jets.md %}) files.

{% include learn/jets-init-files.md learn=true %}

{% include learn/jets-init-review-config.md project="hanami" framework="hanami" %}
