---
title: CORS Support
category: routing
order: 5
---

## Enable CORS

Add rack-cors to your Gemfile

Gemfile

```ruby
gem "rack-cors"
```

Add the following initializer:

config/initializers/cors.rb

```ruby
Jets.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :patch, :put]
  end
end
```

## Testing CORS

Here's a curl command example to help test that CORS is working.

    $ curl -H "Origin: http://example.com" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: X-Requested-With" \
        -X OPTIONS --verbose \
        https://pfw5gle1d8.execute-api.us-west-2.amazonaws.com/dev/ 2>&1 | grep '< HTTP'
    < HTTP/2 200

You should expect a 200 reponse code.

## CORS Handling

CORS support is handled differently from Jets v5 vs Jets v5.

* In Jets v5, CORS support is handled by the Jets Framework and rack-cors instead of at the API Gateway level.
* In Jets v4: [CORS Support]({% link _docs/archives/cors-support.md %}) was handled with the API Gateway.

The reasons for this:

* It allows you to also check CORS support locally.
* It simplifies the implementation.
* [rack-cors](https://github.com/cyu/rack-cors) is more configurable and powerful.

Note: CORS is only supported for