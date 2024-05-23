---
title: Shared Resources Functions
nav_text: Functions
category: custom-shared-resources
order: 4
---

For some Shared Resources you might need to create Lambda functions themselves. Instead of writing the Lambda function code inline with the Shared Resource definition, you can define them in `shared/functions` and declare them with the `function` helper. Here's an example:

## Ruby Example

shared/resources/custom.rb

```ruby
class Custom < Jets::Stack
  function(:bob)
end
```

You then define the function separately in the `shared/functions` folder:

shared/functions/bob.rb

```ruby
def lambda_handler(event:, context:)
  puts("hello bob")
end
```

By default, the `function` method creates Ruby lambda functions.  The default Ruby handler is `lambda_handler`.

There is also a `ruby_function` alias to the `function` method. They do the same thing.

## Python Example

For Shared Resource Functions, you can use Python just as easily.  Here's an example:

shared/resources/custom.rb

```ruby
class Custom < Jets::Stack
  python_function(:kevin)
end
```
You then define the function separately in the `shared/functions` folder:

shared/functions/kevin.py

```python
def lambda_handler(event, context):
  print("hello kevin")
```

## Node Example

Here's also a node example:

shared/resources/custom.rb

```ruby
class Custom < Jets::Stack
  node_function(:stuart)
end
```
shared/functions/stuart.js:

```javascript
exports.handler = function(event, context, callback) {
  console.log("hello stuart");
}
```

## General function Form

The methods `ruby_function`, `python_function`, and `node_function` all delegate to the `function` method.  Here's what the general `function` method looks like:

```ruby
class Custom < Jets::Stack
  function(:kevin,
    Handler: "kevin.lambda_handler",
    Runtime: "ruby3.2"
  )
end
```

And the `function` method calls the general Jets::Stack `resource` method.  So the above can also be written like so:

```ruby
class Custom < Jets::Stack
  resource(:kevin,
    Code: {
      S3Bucket: "!Ref S3Bucket",
      S3Key: code_s3_key
    },
    Handler: "kevin.lambda_handler",
    Runtime: "ruby3.2"
  )
end
```
