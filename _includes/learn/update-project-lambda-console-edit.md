Let's make some changes. Let's start with manual changes. It'll help you get to know how things work.

## Change Lambda Function

The Lambda Console allows us to edit code directly with the browser. It allows us to test, debug, and learn quickly. We'll add a `puts "debug 1"` statement.

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/update-project-manual.png)

You can click **Deploy** to deploy the changes.

{% if include.framework != "events" %}
## Jets Logs

You can also use the [jets logs]({% link _reference/jets-logs.md %}) command to tail the logs in your terminal.

    ❯ jets logs -f
    Tailing logs for /aws/lambda/{{ include.framework }}-dev-controller
    debug 1
    2024-05-22 21:04:22 +0000: hello from {{ include.framework }}

The [jets logs]({% link _reference/jets-logs.md %}) command will use the Log Group from the controller Lambda function, IE: `/aws/lambda/{{ include.framework }}-demo-dev-controller`, so we do not have to specify the name as we did in the [Jets Project Job Learn Guide]({% link _docs/learn/events/update-project.md %}#jets-logs).
{% endif %}

