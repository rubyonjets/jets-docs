---
title: Caching
category: extras
order: 4
---

Jets supports caching. It currently supports Fragment Caching.

## Example

In the view you can use the `cache` helper.

```ruby
<% @products.each do |product| %>
  <% cache product do %>
    <%= render product %>
  <% end %>
<% end %>
```

It'll generate a cache key that looks like

    views/products/index:bea67108094918eeba42cd4a6e786901/products/1

The random string is a digested hash of the contents of the product partial. So when you change the view code, the cache is invalidate automatically.

## Enable

To enable caching:

config/enviroments/development.rb

```ruby
Jets.application.configure do
  config.controller.perform_caching = true
  config.cache_store = :memory_store
end
```

## Cache Stores

Jets caching is based on the Rails caching code, hence they work very similar. Here are examples of the different cache stores. They are all the same ones Rails support.

config/environments/production.rb

```ruby
Jets.configure do |config|
  # config.cache_store = :memory_store,  size: 64.megabytes
  # config.cache_store = :file_store, "/path/to/cache/directory"
  config.cache_store = :mem_cache_store, "cache-1.example.com"
  # config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'] }
  # config.cache_store = :null_store
  end
```

Since Jets runs on AWS Lambda, some of them do not really make sense to use: `memory_store` and `file_store`.

If you're using `mem_cache_store` or `redis_cache_store` with AWS ElastiCache, then your Lambda functions need to be in a private subnet in a VPC. See: [VPC]({% link _docs/considerations/vpc.md %}).

## Related

The Rails Guide Caching documentation is also useful:

* [Caching with Rails: An Overview](https://guides.rubyonrails.org/caching_with_rails.html)
