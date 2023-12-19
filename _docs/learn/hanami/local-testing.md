---
title: Local Testing
search_title: Local Testing Hanami Project
category: learn-hanami
order: 2
---

## Start Server

You can test locally with `bundle exec hanami dev`

Example:

    ❯ bundle exec hanami dev
    03:20:47 web.1    | started with pid 708395
    03:20:47 assets.1 | started with pid 708396
    03:20:48 assets.1 | [demo] [watch] build finished, watching for changes...
    03:20:48 web.1    | 03:20:48 - INFO - Puma starting on port 2300 in development environment.
    ...
    03:20:49 web.1    | * Listening on http://0.0.0.0:2300
    03:20:49 web.1    | * Starting control server on http://127.0.0.1:9293
    03:20:49 web.1    | Use Ctrl-C to stop

A web server allows you to test locally just like a normal rack app.

Note: You can also use `bundle exec hanami server` if you do not want assets to automatically compile.

## Testing Home Page

Test by opening [localhost:2300/](http://localhost:2300/) in a browser:

![](https://img.boltops.com/tools/jets/learn/hanami/local-testing-homepage.png)

On the hanami server side, you'll see the request:

    {"progname":"demo","severity":"INFO","time":"2024-05-22T03:24:20Z","verb":"GET","status":200,"ip":"127.0.0.1","path":"/","length":"-","params":{},"elapsed":59311,"elapsed_unit":"µs"}

Next, we'll set up the project so it can deploy to Serverless AWS Lambda.

