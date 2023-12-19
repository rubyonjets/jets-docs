---
title: Update Project
search_title: Update Project API
category: learn-hanami
order: 9
---

## Code Changes

Let's update the code and deploy again. We'll update the template.

app/templates/home/show.html.erb

```html
<h1>Demo::Views::Home::Show Edit1</h1>
```

## Deploy Again

To deploy again run `jets deploy`.

    ❯ jets deploy
    Will deploy hanami-dev
    Are you sure? (y/N) y
    ...
    Stack success status: UPDATE_COMPLETE
    Release 2: https://www.rubyonjets.com/projects/hanami/releases/release-Ke5vdy0SPtEYdogu
    Prewarming application
    Lambda Url https://x6ge6mf7vpcj5yh72tvlw522zq0zyuxd.lambda-url.us-west-2.on.aws

Once changes have been deployed, confirm code changes.

## Jets Logs

You can also use the [jets logs]({% link _reference/jets-logs.md %}) command to tail the logs in your terminal.

    ❯ jets logs -f
    {"progname":"demo","severity":"INFO","time":"2024-05-22T04:14:33Z","verb":"GET","status":200,"ip":"2002:42ea:d0d2:0:4459:6e7d:f024:65d1","path":"/","length":"-","params":{},"elapsed":157013,"elapsed_unit":"µs"}

**Note**: The [jets logs]({% link _reference/jets-logs.md %}) command use the controller Lambda Function Log Group, IE: `/aws/lambda/hanami-dev-controller` by default, so we do not have to specify the `-n` option.

Next, we'll delete the project.
