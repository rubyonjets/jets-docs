Dockerfile

```Dockerfile
FROM ruby:3.2.3-slim as base
# ...
FROM base as build
{%- if include.before_build %}
{{ include.before_build }} # <= ADDED
{%- endif %}
RUN apt-get update && apt-get install -y default-libmysqlclient-dev
RUN bundle install
# ...
FROM base as deployment
RUN apt-get update && apt-get install -y default-mysql-client
COPY --from=build /usr/local/bundle /usr/local/bundle
# ...
ENTRYPOINT [ "aws_lambda_ric" ]
CMD [ "handlers/controller.lambda_handler" ]
```
