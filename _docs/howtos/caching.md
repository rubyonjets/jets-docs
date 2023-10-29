---
title: Jets Caching
nav_text: Caching
category: howtos
order: 2
---

Jets supports Fragment Caching. Jets uses the same `ActionController::Caching` module underneath the hood as Rails. So, it supports pretty much the same Fragment caching as Rails. Referring the [ Caching with Rails Guide](https://guides.rubyonrails.org/caching_with_rails.html#fragment-caching) can help understand more ways to use the cache.  We'll cover some basic examples here.

## Enabling

config/environments/development.rb

```ruby
Jets.application.configure do
  if Jets.root.join("tmp/caching-dev.txt").exist?
    config.jets_controller.perform_caching = true
    config.cache_store = :memory_store
  end
end
```

The starter development.rb config allows you to turn on caching with

    touch tmp/caching-dev.txt

## Fragment Caching

Here's a simple example.

app/views/products/index.html

```html
<% @products.each do |product| %>
  <% cache product do %>
    <%= render product %>
  <% end %>
<% end %>
```

To test, change the product directly with `jets dbconsole` or a DB client and refresh. You'll see that the fragment is cached.

If you update the product with the edit and update action, the cache will expire automatically. If you update the record with `jets console`, the cache will also automatically expire.  The cache expiration happens at a model callback level.

## Low-Level Caching

Sometimes, you need to cache lower-level values. You can use `Jets.cache` directly in this case.

```ruby
class Product < ApplicationRecord
  def competing_price
    Jets.cache.fetch("#{cache_key_with_version}/competing_price", expires_in: 12.hours) do
      Competitor::API.find_price(id)
    end
  end
end
```

## Cache Storage and VPC

Jets Caching supports all the same Cache Stores as Rails Caching. See [Rails Cache Stores](https://guides.rubyonrails.org/caching_with_rails.html#cache-stores).

In real-world practice, the main Cache Stores I've used with Rails have been MemCacheStore and RedisCacheStore. This is because these storages allow you to manage and expire the cache centrally. Unlike the FileStore, which could be stored on any server or any of the warmed-up Lambda functions in the AWS Lambda case.

For AWS ElastiCache Memcached and Redis, both only expose an internal network endpoint. This means you have to configure your Lambda function to use a VPC to use them. There are some pros and cons with [VPC enabled Lambda functions]({% link _docs/considerations/vpc.md %}).

## Future Improvements

* Action and Page Caching are not supported yet. Rails provides these in these separate gems: [rails/actionpack-action_caching](https://github.com/rails/actionpack-action_caching) and [rails/actionpack-page_caching](https://github.com/rails/actionpack-page_caching). It would essentially be ports of those gems.
* Currently, the `config.enable_fragment_cache_logging = true` is not respected. We want to fix this and figure out why the LogSubscribers are not firing with Jets.
* We'll also review and consider PRs.
