The `project.rb` has simple configurations that load the earliest in the Jets boot process.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.name = "demo"
end
```

The `project.rb` mainly has the project name. The project name will be part of the stack name to deploy. IE: `project=demo` => `stack=demo-dev` gets to deploy to AWS.
