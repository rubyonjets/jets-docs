---
title: Base64 Encoding Funny Characters
nav_text: Base64 Encoding
category: considerations
order: 88
---

If you're seeing that AWS Lambda seems to be renders special characters funny, it's possible you have disabled the Jets base64 encoding default behavior. Lambda Function URLs need the content to be base64 encoded for special characters. Here are some examples of special characters:

> © ’ ‘ “ ”

AWS Lambda faithfully render these special characters properly, but Lambda Function URL and API Gateway cannot properly translate them without base64 encoding. You end up with weird looking characters in the browser. For this reason, the Jets Shim base64 encodes the body content by default.

## Encoding Default

You can adjust the base64 encoding behavior with `base64_encode`.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.name = "demo"
  config.base64_encode = true # default: true
end
```

If turn this off, you may notice funny looking special characters.

In general, you are not debugging at the Jets Shim level and are just interested in the JSON or HTML content body. By the time the response gets back from the Lambda Function URL service, it has already been translated back from the base64 encoding. Base64 encoding is handled automatically and you won't even notice it.

## Per Request

You can also selectively base64 encoded with a response header. With Rails, it's:

```ruby
response.headers["x-jets-base64"] = "1" # turns on base64
response.headers["x-jets-base64"] = "0" # turns off base64
```

## Binary Support

Binary data such as images are automatically base64 encoded regardless of the default setting or header.
