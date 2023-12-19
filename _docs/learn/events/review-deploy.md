---
title: Review Deploy
search_title: Review Deploy Job
category: learn-events
order: 8
---

Let's review what been deployed.

## CloudFormation Console

Jets leverages CloudFormation for deployment, so check the CloudFormation console. You should see something like this:

![](https://img.boltops.com/tools/jets/learn/events/review-deploy-cloudformation-console.png)

Jets creates a main parent `events-dev` stack that in turn creates a few nested CloudFormation stacks. This solves the [CloudFormation quotas and limits](AWS CloudFormation quotas).  Here's a summary:

* There is a stack that manages the Event, it starts with `events-dev-CoolEvent-*`.

## Lambda Resources

If you look at CloudFormation stack `events-dev-CoolEvent-*` Resources tab, you'll see the Lambda Function.

![](https://img.boltops.com/tools/jets/learn/events/review-deploy-cloudformation-lambda.png)

Clicking on the Physical ID link takes you to the Lambda console. You can see the Lambda handler code there.

![](https://img.boltops.com/tools/jets/learn/events/review-deploy-lambda-handler.png)

The Lambda function handler shim is generated as part of `jets deploy`. The handler is the "point of entry" for Lambda and provides interface that Lambda expects. The `Jets.shim.handler` ultimately calls the events app. You can open `app.rb` and see the code we created earlier.

![](https://img.boltops.com/tools/jets/learn/events/review-deploy-lambda-app-code.png)

## Test Lambda Function

Let's test Lambda function manually with the Lambda Console built-in Test functionality. For the event, you need a payload that mimics what Lambda URL would send to the Lambda function. Here's an example:

```json
{
  "id": "dummy",
  "detail-type": "Scheduled Event",
  "source": "aws.events"
}
```

After you click **Test**, you'll see a "Executing function: succeeded" message with a link to the logs.

![](https://img.boltops.com/tools/jets/learn/events/review-deploy-test-lambda-manual.png)

Clicking on the **logs** link takes you to the CloudWatch Logs Console. It shows all the Log Streams for the Log Group for the Lambda Function. Clicking **Search Log Group** is then filtering by 1m or 30m is an easy to to see the logs.

![](https://img.boltops.com/tools/jets/learn/events/review-deploy-lambda-test-logs.png)

Testing with the Lambda console is a bit of a pain because we need to figure out the event payload structure. See [Debug Event Payloads]({% link _docs/debug/event-payloads.md %}) for more example payloads.

Next, we'll make some updates and do more testing.
