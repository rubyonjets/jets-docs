Dockerfile

```Dockerfile
FROM ruby:3.2.3-slim as base
# ...
FROM base as build
{%- if include.before_build %}
{{ include.before_build }} # <= ADDED
{%- endif %}
RUN apt-get update && apt-get install -y build-essential
RUN bundle install
# ...
{%- if include.after_build %}
{{ include.after_build }}  # <= ADDED
{%- endif %}

FROM base as deployment
{%- if include.before_deployment %}
{{ include.before_deployment }} # <= ADDED
{%- endif %}
RUN apt-get update && apt-get install -y curl
COPY --from=build /usr/local/bundle /usr/local/bundle
# ...
{%- if include.after_deployment %}
{{ include.after_deployment }}  # <= ADDED
{%- endif %}

ENTRYPOINT [ "aws_lambda_ric" ]
CMD [ "handlers/controller.lambda_handler" ]
```
