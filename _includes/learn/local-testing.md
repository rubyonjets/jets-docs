## Start Server

You can test locally with `bundle exec puma`.

Example:

    ❯ bundle exec puma
    Puma starting in single mode...
    * Listening on http://0.0.0.0:9292
    Use Ctrl-C to stop

A web server allows you to test locally like usual.

## Testing

You can test with curl

    ❯ curl -s "http://localhost:9292/"
    2024-04-06 18:07:52 +0000: hello from {{ include.framework }}

Or by opening [localhost:9292](http://localhost:9292) in a browser:

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/browser-homepage.png)

On the puma server side, you'll see the requests

    ❯ bundle exec puma
    * Listening on http://0.0.0.0:9292
    Use Ctrl-C to stop
    2024-04-06 18:07:52 +0000: hello from {{ include.framework }}
    2024-04-06 18:07:54 +0000: hello from {{ include.framework }}

Next, we'll set up the project so it can deploy to Serverless AWS Lambda.
