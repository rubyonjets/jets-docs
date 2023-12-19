---
title: Local Testing
search_title: Local Testing Project Job
category: learn-events
order: 4
---

You can test the event code locally with an IRB console. Example:

    ❯ bundle exec irb
    > Bundler.require
    > Jets.boot
    > CoolEvent.handle_now(:handle, {foo: "bar"})
    Do something with event {"foo":"bar"}

A second argument can be passed to as the event payload. Example:

    > CoolEvent.handle_now(:handle, {foo: "bar"})
    Do something with event {"foo":"bar"}

You can use the second argument to mock test event payloads. There's not much useful information in a Schedule Event payload, other [Events]({% link _docs/events.md %}) can have more useful information.

## Jets Boot Note

With a simple events project `Jets.boot` is not automatically called locally. If you're working with Rails project, `Jets.boot` is automatically called, so you can simply use.

    ❯ bundle exec rails console
    > CoolEvent.handle_now(:handle, {foo: "bar"})

The [jets-rails plugin]({% link _docs/plugins.md %}) handle automatically calling `Jets.boot`.

Also, on AWS Lambda, the Jets shim automatically calls it `Jets.boot` even with a simple events project.  So this is something you only have to do locally.

Next, we'll set up the project so it can deploy to Serverless AWS Lambda.
