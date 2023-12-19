---
title: Config Reference
nav_text: Reference
category: config
order: 88
---

Here's a list of the available config settings. These settings here are specific to Jets.

{% include config/reference/header.md %}
{% include config/reference/assets.md %}
{% include config/reference/codebuild.md %}
{% include config/reference/ci.md %}
deploy.stagger.batch_size | 10 | Stagger the cloudformation update batch size.
deploy.stagger.enable | false | Stagger the cloudformation update. Can be helpful with large apps.
{% include config/reference/events.md %}
{% include config/reference/lambda.md %}
logger | `Jets::Logger.new($stderr)` | Jets logger
logger.formatter | `Logger::Formatter.new` | The log formatter. Jets v5 apps set this in `config/environments/development.rb` to `ActiveSupport::Logger::SimpleFormatter.new`
logging.event | true | Whether or not to log the `event`. Jets v5 apps set this in `config/environments/development.rb` to `false`.
package_type | image | Package type, either image or zip. Note: If you're using Rails, Jets only supports the image format. See: [AWS Lambda Package Type]({% link _docs/config/package-type.md %}).
{% include config/reference/prewarm.md %}

Here's also the [application/defaults.rb](https://github.com/rubyonjets/jets/blob/master/lib/jets/application/defaults.rb) source where these config options are defined.
