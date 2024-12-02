## Review Config

Let's take a look some of the config files. We'll review them in an introductory manner. For more details, see: [Jets Config: project, bootstrap, deploy](https://docs.rubyonjets.com/docs/config/jets/)

### project

{% include learn/config-jets-project.md project="rails" %}

### bootstrap

{% include learn/config-jets-bootstrap.md %}

### deploy

The `deploy.rb` contains the most options and will be the config you'll likely adjust most. It controls how the remote runner builds and deploys your project to Serverless AWS Lambda. The `jets init` provides a starter `deploy.rb` with helpful comments.

config/jets/deploy.rb

{% if include.package_type %}
  {% assign package_type = include.package_type %}
{% else %}
  {% assign package_type = "image" %}
{% endif %}

{% if include.project == "events" %}
```ruby
Jets.deploy.configure do
{% include learn/config-jets-deploy.md %}
  {% if package_type == "image" %}# {% endif %}config.package_type = "{{ package_type }}"
  config.lambda.controller.enable = false
end
```
{% else %}
```ruby
Jets.deploy.configure do
{% include learn/config-jets-deploy.md %}
  {% if package_type == "image" %}# {% endif %}config.package_type = "{{ package_type }}"
end
```
{% endif %}

{% if package_type == "zip" %}
Since this is a lightweight {{ include.framework }} app, we'll use the zip package type. For more info see: [Package Types]({% link _docs/config/package-type.md %})

{% if include.project == "events-demo" %}
We'll also disable the creation of the Controller Lambda Function with `config.lambda.controller.enable = false`.
{% endif %}

{% else %}
The default package type is `image`. Jets will deploy a Docker image as a AWS Lambda function. For more info see: [Package Types]({% link _docs/config/package-type.md %})
{% endif %}

Next, we'll make sure the AWS config is set up and working properly. Then you'll be ready to deploy to AWS Lambda.
