---
title: jets runner
reference: true
---

## Usage

    jets runner [options]

## Description

Run Ruby code in the context of Jets app non-interactively

## Examples

    $ jets runner 'puts "hi"'
    hi
    $ jets runner 'puts Jets.env'
    development

Using a script in a file.  Let's say you have a script:

script.rb:

```ruby
puts "hello world: #{Jets.env}"
```

    $ jets runner file://script.rb
    hello world: development


Optionally pass in an argument on the command line:

    Usage: jets runner file|Ruby code [args]

The argument will be assigned to the `args` variable.

Example:

    $ jets runner 'puts "hello world with args: #{args}"' 123
    hello world with args: 123


Example with script.rb:

```ruby
puts "hello world with args: #{args}"
```

    $ jets runner file://script.rb 123
    hello world with args: 123


## Options

```
-e, [--environment=ENVIRONMENT]  # Specifies the environment to run this runner under (test/development/production).
```

