---
title: Config Reference
nav_text: Reference
category: config
order: 88
---

Here's a list of the available config settings. These settings here are specific to Jets.

Since Jets leverages some Rails components like ActiveRecord under-the-hood, some of those settings are also available. Please refer to [Rails documentation](https://guides.rubyonrails.org/configuring.html) for those settings. Note: Though most Rails settings are available, not all are. The best way is to give it a try and see. If a setting is unavailable and you want to see it, please submit a PR for consideration.

{% include config/reference/header.md %}
api.api_key_required | false | Whether or not to require API key
api.authorization_type | NONE | API Gateway default authorization_type
api.authorizers.default_token_source | Auth | This the header to look for and use in the `method.request.header`. IE: `method.request.header.Auth`
api.auto_replace | nil | Whether or not to auto replace the API Gateway when necessary. By default, will prompt user. Setting this to `true` bypasses the prompt. Note changing the API Gateway will change the endpoint. It's recommended to set up a [custom domain]({% link _docs/routing/custom-domain.md %}) which is updated with the new API Gateway endpoint automatically.
api.binary_media_types| ['multipart/form-data'] | Content types to treat as binary
api.cors | false | Enable cors
api.cors_authorization_type  | nil | API Gateway default authorization_type for CORS. Note, default is `nil` so ApiGateway::Cors#cors_authorization_type handles.
api.endpoint_policy | nil | Note, required when endpoint_type is EDGE
api.endpoint_type | EDGE | Endpoint type. IE: PRIVATE, EDGE, REGIONAL
app.domain | nil | The app domain to use. Should be the domain only without the protocol. This applies at the controller-level, IE: methods like `redirect_to`
{% include config/reference/assets.md %}
autoload_paths | [] | Customize autoload paths. Add extra paths you want to Jets autoload.
build.prebundle_copy | [] | Paths to copy over to the code cache area before `bundle install`. Useful for copying gems in Gemfile with a local relative path source.
controllers.default_protect_from_forgery | true for html mode, false for api mode. | Whether or not to check for forgery protection
controllers.filtered_parameters | [] | Parameters to filter in logging output
{% include config/reference/cfn.md %}
deploy.stagger.batch_size | 10 | Stagger the cloudformation update batch size.
deploy.stagger.enabled | false | Stagger the cloudformation update. Can be helpful with large apps.
domain.cert_arn | nil | Cert ARN for SSL
domain.endpoint_type | REGIONAL | The endpoint type to create for API Gateway custom domain. IE: EDGE or REGIONAL. Default to EDGE because CloudFormation update is faster
domain.name | nil | Custom domain name to use. Recommend to leave nil and jets will set a conventional custom domain name and then use CloudFront in front outside of Jets to fully control the domain name.
domain.route53 | true | Controls whether or not to create the managed route53 record.
encoding.default | utf-8 | Default encoding
{% include config/reference/events.md %}
function.ephemeral_storage.size | 512 | Lambda function default size of the /tmp directory in megabytes
function.memory_size | 1536 | Lambda function default memory size
function.timeout | 30 | Lambda function default timeout
pro.clean | false | Whether or not to always rebuild binary gems in the cache folder.
pro.disable | false | Disable use of [Jets Pro]({% link _docs/pro.md %}) service. Disable access to precompiled gems. Note, this means you must build a custom lambda layer yourself. Also, disables the recording of deployments to Jet Pro dashboard.
helpers.host | nil | Override the host value use in the view helpers. IE: https://myurl.com:8888
hot_reload | Defaults to true in development and false in other envs | Whether or not to hot reload
ignore_paths | [] | Customize ignore paths. These paths will be ignored by the autoloader.
inflections.irregular | {} | Special case inflections
lambda.layers | [] | Additional custom lambda layers to use.
logger | `Jets::Logger.new($stderr)` | Jets logger
logger.formatter | `Logger::Formatter.new` | The log formatter. Jets v5 apps set this in `config/environments/development.rb` to `ActiveSupport::Logger::SimpleFormatter.new`
logging.event | true | Whether or not to log the `event`. Jets v5 apps set this in `config/environments/development.rb` to `false`.
prewarm.enable | true | Enable prewarming noop call.
prewarm.public_ratio  | 3 | Prewarming public ratio
prewarm.rack_ratio | 5 | Prewarming rack ratio
prewarm.rate | 30 minutes | Prewarming Rate
project_name | generated as part of `jets new` | Jets project name
ruby.check | true | Check at bootup time for supported Ruby versions.
ruby.supported_versions | %w[2.5 2.7 3.2] | List of officially supported Ruby versions.
session_options | {} | Session storage options
session_store | :cookie_store | Session storage.
time_zone | UTC | Time zone

Here's also the [application/defaults.rb](https://github.com/rubyonjets/jets/blob/master/lib/jets/application/defaults.rb) source where these config options are defined.
