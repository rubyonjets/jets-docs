The `project.rb` is always loaded earliest. It has simple configurations are loaded super early in the Jets boot process.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.name = "{{ include.project }}"
end
```

The `project.rb` has the project name. The `jets init` command infers the name from the parent folder. Change it to `{{ include.project }}` if it's not already.

The project name will be part of the stack name to deploy. IE: `project={{ include.project }}` => `stack={{ include.project }}-dev` gets to deploy to AWS.
