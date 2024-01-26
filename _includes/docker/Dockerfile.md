Dockerfile

```Dockerfile
{%- if include.build_args_at_the_top %}
{{ include.build_args_at_the_top }} # <===== ADDED
{%- endif %}
FROM ruby:3.2.3-slim as base
# ...
FROM base as build
RUN apt-get update && apt-get install -y build-essential
{%- if include.build_args_at_build_stage %}
{{ include.build_args_at_build_stage }} # <===== ADDED
{%- endif %}
{%- if include.before_build %}
{{ include.before_build }} # <===== ADDED
{%- endif %}
RUN bundle install
# ...
{%- if include.after_build %}
{{ include.after_build }}  # <===== ADDED
{%- endif %}

FROM base as deployment
RUN apt-get update && apt-get install -y curl
{%- if include.build_args_at_deployment_stage %}
{{ include.build_args_at_deployment_stage }} # <===== ADDED
{%- endif %}
{%- if include.before_deployment %}
{{ include.before_deployment }} # <===== ADDED
{%- endif %}
COPY --from=build /usr/local/bundle /usr/local/bundle
# ...
{%- if include.after_deployment %}
{{ include.after_deployment }}  # <===== ADDED
{%- endif %}

ENTRYPOINT [ "aws_lambda_ric" ]
CMD [ "handlers/controller.lambda_handler" ]
```
