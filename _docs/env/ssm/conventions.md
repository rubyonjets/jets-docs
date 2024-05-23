---
title: SSM Parameter Conventions
nav_text: Conventions
category: env-ssm
order: 1
---

{% include env/ssm/conventions.md %}

## Conventional SSM Names

Additionally, there is some conventional SSM name logic to help DRY up your dotenv files. Some examples probably best help explain:

    DATABASE_URL=SSM        # => DATABASE_URL=/demo/dev/DATABASE_URL
    DATABASE_URL=SSM:DB_URL # => DATABASE_URL=/demo/dev/DB_URL

If the value starts with a `/` right after `SSM:`, IE: `SSM:/abs/path/DB_URL`, then the conventional behavior is not performed.

    DATABASE_URL=SSM:/shared/dev/DB_URL # => DATABASE_URL=/shared/dev/DB_URL

## Custom Convention Resolver

The conventional SSM name works like this:

    DATABASE_URL=SSM        # => DATABASE_URL=/demo/dev/DATABASE_URL
    DATABASE_URL=SSM:DB_URL # => DATABASE_URL=/demo/dev/DB_URL

For advanced use cases where the that logic does not work for your needs, you can configure a custom convention_resolver.

config/jets/project.rb

```ruby
Jets.project.configure do
  config.dotenv.ssm.convention_resolver = ->(ssm_leaf_name) do
    "/#{Jets.project.name}/#{ssm_env}/#{ssm_leaf_name}"
  end
end
```

It can be any object that responds to `.call` and is passed the ssm_leaf_name as an argument.

{% include reference/config/header.md %}
{% include reference/config/bootstrap/dotenv.md %}
{% include reference/config/footer.md %}
