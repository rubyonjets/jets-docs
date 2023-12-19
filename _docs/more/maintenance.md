---
title: Jets Maintenance Mode
nav_text: Maintenance Mode
category: more
order: 4
---

Jets supports a built-in maintenance mode. When maintenance mode is turned on, a static maintenance page is served to all users with a 503 HTTP status code.

While in maintenance mode, access to your app is temporarily disabled. This includes not connecting to your database. This can be useful for large migrations.

## Usage

To enable maintenance mode:

    ❯ jets maintenance:on
    Will enable web maintenance mode for demo-dev
    Are you sure? (y/N) y
    Enabling web maintenance mode for demo-dev
    Web maintenance has been turned on

To disable maintenance mode:

    ❯ jets maintenance:off
    Disabling web maintenance mode for demo-dev
    Web maintenance has been turned off

To check the current maintenance status of an app:

    ❯ jets maintenance:status
    Web maintenance status for demo-dev
    off

**Tip**: Only the status data with `on` or `off` is written in stdout. All other messages are written to stderr. This can be useful for capturing.

## Controller Lambda Function and Maintenance Mode

Activating maintenance mode does not remove or delete your controller Lambda function. The Lambda function continues to handle the request. Jets short-circuits the logic and returns a maintenance page immediately.

## Worker Maintenance

Jets [Jobs]({% link _docs/jobs.md %}) and [Events]({% link _docs/events.md %}) are "workers". They perform work in the background outside of the web request-response cycle. You can also disable workers also with.

    jets maintenance:on --role worker
    jets maintenance:off --role worker
    jets maintenance:status --role worker

The default role is web. You can control which role you want to put into maintenance mode. If you want to see the status of all roles.

    ❯ jets maintenance:status --all
    Maintenance status for demo-dev
    web off
    worker off

For workers, Jets temporarily scales down the event-based Lambda Functions Reserved Concurrency to 0 and removes Provisioned Concurrency while maintenance is on. When maintenance mode is turned back off, the settings are restored.

Jets is able to scale the Lambda Function down and disable them thanks to the ActiveJob [jets_job adapter]({% link _docs/jobs/enable.md %}#jets-job-activejob-adapter).

## Custom Maintenance Page

If you want to use a custom maintenance page, you can create one under the `public` folder. Example:

public/maintenance.html

```html
<html>
  <head><title>Maintenance</title></head>
  <body><h1>Currently Under Maintenance</h1><p>We've gone fishing.</p></body>
</html>
```

If the `maintenance.html` file exists, Jets will use it when maintenance mode is turned on.

## Custom Maintenance JSON

If you want a JSON maintenance response instead of an HTML maintenance page, you can create a JSON file in the public folder.

public/maintenance.json

```json
{
  "status": "maintenance",
  "message": "We're currently undergoing some maintenance. Thank you for your patience. Please check back later!"
}
```

If a `maintenance.json` exists, Jets will serve it with a `Content-Type: application/json` and HTTP Status Code 503.

If both `public/maintenance.html` and `public/maintenance.json` exist, Jets uses the HTML one.

