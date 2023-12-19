{% if include.learn %}
## Init Files

Here's a review of the files `jets init` generates.
{% else %}
## Config Jets Files

Here's an summary of the `config/jets` files.
{% endif %}

File | Description
---|---
config/jets/project.rb | Project settings like project name. The project name is a part of the stack name to deploy. IE: `project=demo` => `stack=demo-dev` gets to deploy to AWS.
config/jets/bootstrap.rb | Bootstrap settings are used for the `jets deploy` initial bootstrap deployment. This phase creates the s3 bucket and codebuild remote runner which will be used to deploy your project. The remote runner provides a consistent build environment, CPU architecture, raw horsepower, and internet speed. See: [Remote Runner]({% link _docs/remote.md %}).
config/jets/deploy.rb | This is where the main deploy settings live. It tells the jets remote runner how it should deploy. These are the settings you'll probably update the most.
{% if include.framework == "rails" %}config/jets/env | Jets dotenv files. Jets provides additional dotenv support; notably dotenv SSM support. So you can store sensitive env variables centrally on your AWS account.{% endif %}
