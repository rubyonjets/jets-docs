{% if include.package_type %}
  {% assign package_type = include.package_type %}
{% else %}
  {% assign package_type = "image" %}
{% endif %}

Let's review what has been deployed.

## CloudFormation Console

Jets leverages CloudFormation for deployment, so check the CloudFormation console. You should see something like this:

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/review-deploy-cloudformation-console.png)

Jets creates a main parent `{{ include.project }}-dev` stack that in turn creates a few nested CloudFormation stacks. This solves the [CloudFormation quotas and limits](AWS CloudFormation quotas). Here's a summary:

* There is a stack that manages the controller requests, it starts with `{{ include.project }}-dev-JetsController-*`.
* There is a stack that manages a PrewarmEvent; it starts with `{{ include.project }}-dev-JetsPrewarmEvent-*`

## Lambda Resources

If you look at CloudFormation stack `{{ include.project }}-dev-JetsController-*` Resources tab, you'll see the Lambda Function.

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/review-deploy-cloudformation-lambda.png)

Clicking on the Physical ID link takes you to the Lambda console. {% if package_type == "zip" %}You can see the Lambda handler code there.{% else %} Since we use the package type image, instead of seeing the AWS console inline editor, we see the Image URI that points to the ECR repo.{% endif %}

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/review-deploy-lambda-handler.png)

{% if package_type == "zip" %}
The Lambda function handler shim is generated as part of `jets deploy`. The handler is Lambda's "point of entry" and provides the interface it expects. The `Jets.shim.handler` ultimately calls the {{ include.framework }} app. You can open `app.rb` and see the code we created earlier.

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/review-deploy-lambda-app-code.png)
{% endif %}

## Test Lambda Function

Let's test the Lambda function manually with the Lambda Console built-in Test functionality. For the event, you need a payload that mimics what Lambda URL would send to the Lambda function. Here's a minimal example:

```json
{
  "version": "2.0",
  "rawPath": "/",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  }
}
```

{% if include.framework == "rails" %}
**Note**: The `x-forwarded-proto` and `x-forwarded-port` is required for Rails. Otherwise, Rails will think it's a plain HTTP request and try redirecting to an https URL. The Rails `config.force_ssl` and [ActionDispatch::SSL middleware](https://github.com/rails/rails/blob/41d867d5b1f74a36c3b06c5e511eb795ba2ee402/railties/lib/rails/application/default_middleware_stack.rb#L24) does this.
{% endif %}

After you click **Test**, you'll see an "Executing function: succeeded" message with a link to the logs.

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/review-deploy-test-lambda-manual.png)

Clicking on the **logs** link takes you to the CloudWatch Logs Console. It shows all the Log Streams for the Log Group for the Lambda Function. Clicking **Search Log Group** and filtering by 1m or 30m is an easy way to see the logs.

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/review-deploy-lambda-test-logs.png)

Testing with the Lambda console is a pain because we need to figure out the event payload structure. See [Debug Event Payloads]({% link _docs/debug/event-payloads.md %}) for more example payloads.

## Testing with a Browser

It's more traditional to test with a browser. You can use the `jets url` command to get the endpoint.

    ❯ jets url
    Lambda Url {{ include.lambda_url }}

You can open up the browser and test it just like you did with [Local Testing]({% link _docs/learn/{{ include.framework }}/local-testing.md %})

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/review-deploy-browser-index.png)

Next, we'll make some updates and do more testing.
