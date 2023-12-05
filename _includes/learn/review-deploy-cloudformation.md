Let's review what been deployed.

## CloudFormation Console

Jets leverages CloudFormation for deployment, so check the CloudFormation console. You should see something like this:

![](https://img.boltops.com/tools/jets/learn/{{ include.mode }}/review-deploy-cloudformation-console.png)

Jets creates a main parent `demo-dev` stack that in turn creates a few nested CloudFormation stacks. This solves the [CloudFormation quotas and limits](AWS CloudFormation quotas).  Here's a summary:

* There are few stacks that manage the API Gateway resources. They start with `demo-dev-Api*`
* There a stack that manages a PreheatJob, it starts with `demo-dev-JetsPreheatJob-*`
* There is a stack that manages the controller, it starts with `demo-dev-JetsController-*`.

## API Gateway REST API

If you look at CloudFormation stack `demo-dev-ApiGateway-*` Resources tab, you'll see the Rest API.

![](https://img.boltops.com/tools/jets/learn/{{ include.mode }}/review-deploy-cloudformation-apigw.png)

Clicking on the Physical ID link takes you to the APIGW console. You can see that that points to a demo-dev-controller Lambda function.

![](https://img.boltops.com/tools/jets/learn//{{ include.mode }}/review-deploy-apigw-catchall.png)

## Lambda Console

The demo-dev-controller Lambda function is defined in the `demo-dev-JetsController-*` CloudFormation stack.

![](https://img.boltops.com/tools/jets/learn/{{ include.mode }}/review-deploy-cloudformation-lambda.png)

Clicking on the Physical ID link takes you to the Lambda console. You can see the Lambda handler code there.

![](https://img.boltops.com/tools/jets/learn/{{ include.mode }}/review-deploy-lambda-handler.png)

The Lambda function handler is generated as part of `jets deploy`. The handler is the "point of entry" for Lambda and provides interface that Lambda expects.The code routes the request to the desired controller action.

The `Jets.process` ultimately calls the `PostsController` action methods. You can open `app/controllers/posts_controller.rb` and see the code we created earlier.

![](https://img.boltops.com/tools/jets/learn/{{ include.mode }}/review-deploy-lambda-posts-controller.png)

Note: Jets v5 creates one APIGW Method and Lambda function for all controller actions. Previous versions of Jets created multiple resources. There are some pretty [significant advantages with the Jets v5 approach]({% link _docs/thoughts/cfn-many-lambdas.md %}).

## Test Lambda Function

Let's test Lambda function manually with the Lambda Console built-in Test functionality. For the event, you need a payload that mimics what the APIGW service would send to the Lambda function. Here's an minimal example:

```json
{
  "path": "/posts",
  "httpMethod": "GET",
  "headers": {
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  }
}
```

After you click **Test**, you'll see a "Executing function: succeeded" message with a link to the logs.

![](https://img.boltops.com/tools/jets/learn/{{ include.mode }}/review-deploy-test-lambda-manual.png)

Clicking on the **logs** link takes you to the CloudWatch Logs Console. It shows all the Log Streams for the Log Group for the Lambda Function. Clicking **Search Log Group** is then filtering by 1m or 30m is an easy to to see the logs.

![](https://img.boltops.com/tools/jets/learn/{{ include.mode }}/review-deploy-lambda-test-logs.png)

Testing with the Lambda console is a bit of a pain because we need to figure out the event payload structure. See [Debug Event Payloads]({% link _docs/debug/payloads.md %}) for more example payloads. We'll test with {% if include.mode == "html" %}a browser{% else %}curl{% endif %} next.
