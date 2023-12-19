---
title: SQS Events
categories: events
order: 8
---

Jets supports [SQS Events](https://aws.amazon.com/blogs/aws/aws-lambda-adds-amazon-simple-queue-service-to-supported-event-sources/) as a Lambda trigger. So you can send a message to an SQS queue and it triggers a Lambda function to run.  The Lambda function has access to the message data via `event`.

<div class="video-box"><div class="video-container"><iframe src="https://www.youtube.com/embed/YxuTX15agdk" frameborder="0" allowfullscreen=""></iframe></div></div>

There are a few ways to connect an SQS queue to a Lambda function with Jets.

1. Existing SQS Queue
2. Generated Function SQS Queue
3. Generated Shared SQS Queue

We'll cover each of them:

## Existing SQS Queue

Here is an example connecting an existing SQS queue to a Lambda function in a [Event]({% link _docs/events.md %})

Generate code.

    jets generate:event waiter --trigger sqs --method order

It looks something like this.

app/events/waiter_event.rb

```ruby
class WaiterEvent < ApplicationEvent
  class_timeout 15.minutes # Lambda Function timeout must be less than or equal to the SQS Visibility timeout
  sqs_event "hello-queue"
  def order
    puts "event #{JSON.dump(event)}"
    puts "sqs_events #{JSON.dump(sqs_events)}"
  end
end
```

Ultimately, the `sqs_event` declaration generates a [Lambda::EventSourceMapping](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-eventsourcemapping.html).  The properties of the mapping can be set with an additional Hash argument:

```ruby
  sqs_event("hello-queue", batch_size: 10)
```

## Generated Function SQS Queue

Jets can create and manage an SQS queue for a specific function. This is done with a special `:generate_queue` argument.

```ruby
class CoolEvent < ApplicationEvent
  class_timeout 30 # must be less than or equal to the SQS queue default timeout
  sqs_event :generate_queue
  def lift
    puts "lift event #{JSON.dump(event)}"
  end
end
```

A special `:QueueProperties` key will set the [SQS::Queue](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sqs-queue.html) properties. Other keys set the [Lambda::EventSourceMapping](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-eventsourcemapping.html) properties.  Example:

```ruby
  sqs_event(:generate_queue,
    BatchSize: 10, # property of EventSourceMapping
    QueueProperties: {
      MessageRetentionPeriod: 345600, # 4 days in seconds
  })
```

Here's an example screenshot of a generated SQS queue:

![](/img/docs/sqs-queue.png)

Note, SQS Queues managed by Jets are deleted when you delete the Jets application.

## Generated Shared SQS Queue

Jets can also support creating a shared SQS Queue via a [Shared Resource]({% link _docs/custom/shared-resources.md %}). Here's how you create the SQS queue as a shared resource:

shared/resources/list.rb

```ruby
class List < Jets::Stack
  sqs_queue(:waitlist)
end
```

You can reference the Shared Queue like so:

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  class_timeout 30 # must be less than or equal to the SQS queue default timeout
  depends_on :list # so we can reference list shared resources
  sqs_event ref(:waitlist) # reference sqs queue in shared resource
  def fix
    puts "fix #{JSON.dump(event)}"
  end
end
```

Underneath the hood, Jets provisions resources via CloudFormation.  The use of `depends_on` ensures that Jets will pass the shared resource `List` stack outputs to the `CoolEvent` stack as input parameters. This allows `CoolEvent` to reference resources from the separate child `List` stack.

{% include cloudformation_links.md %}

## Accessing the SQS Url

You can access the SQS url with the `lookup` method. The method is available to `Jets::Stack` subclasses like the `List` class here. Here's an example:

app/events/postman_event.rb

```ruby
class PostmanEvent < ApplicationEvent
  include Jets::AwsServices

  iam_policy "sqs"
  def deliver
    puts "queue arn: #{List.lookup(:waitlist)}"
    puts "queue url: #{List.lookup(:waitlist_url)}"
    queue_url = List.lookup(:waitlist_url)
    message_body = JSON.dump({"test": "hello world"})
    sqs.send_message(
      queue_url: queue_url,
      message_body: message_body,
    )
  end
end
```

## Send Test Message

Here's an example of sending a message to an SQS queue via the [aws sqs send-message](https://docs.aws.amazon.com/cli/latest/reference/sqs/send-message.html) CLI:

    aws sqs send-message --queue-url https://sqs.us-west-2.amazonaws.com/112233445566/hello-queue --message-body '{"test": "hello world"}'

You can send a message via the SQS Console, sdk, etc also.

## Tailing Logs

It helps to tail the logs and watch the event as it comes through.

    jets logs -f -n waiter_event-order

## Event Payloads

Here's an example of the event payload.

```json
{
    "Records": [
        {
            "messageId": "1e0bfe01-f9df-46c0-8d86-2fd898e4dee9",
            "receiptHandle": "AQEBgxVw0hjHeNKB1brir4hr0Fxvz4ERJIqd7bP/iHw82/+UUx/r4W0KG3FSiEA4A+Vk0oS8dT6W8be/Bn7eJjKspZfW2KzC0xzsCmS+BihySk1SX9FM5SW1rFd3bFWYtT6s7pOX2inaU/THtn7Envp5Rs+zehmNIspnLPZkf9h3RFSQk12xaVaOmCQnHtz9o8uKIXwMEwn5IhlJgC0DIuM1v8NZK8Hc65b4xpf09vf01LEA/XdXm24SjfJ0fl7ev2rBXtkMitAfNmKd8x0fcbG3O7H7wB+CIKR4+QvGcI6u9QuAdPU5MpIJ46niJmrtnIx70S5Go1paUYMa77ABBjFWoJkJHvHouuiohEQHdMrH1QSyabNBS2Nw2dikhBcXVtLQW4iH+xNXwLIVUxarAk9EHokh1iGWZsG91whmPaAl0t2Vdfo6Dcm0/6IgXhKcLFIw",
            "body": "{\"test\": \"hello world\"}",
            "attributes": {
                "ApproximateReceiveCount": "1",
                "SentTimestamp": "1550605918693",
                "SenderId": "AIDAJTCD6O457Q7BMTLYM",
                "ApproximateFirstReceiveTimestamp": "1550605918704"
            },
            "messageAttributes": {},
            "md5OfBody": "3d635e69eb93fd184b47a31d460ca2b6",
            "eventSource": "aws:sqs",
            "eventSourceARN": "arn:aws:sqs:us-west-2:112233445566:demo-dev-List-3VJ13ADFT5VZ-Waitlist-X35N8JKWZTL3",
            "awsRegion": "us-west-2"
        }
    ]
}
```

### sqs_events

The `sqs_event` helper method unravels the data and provides the SQS message body.


```json
[{
  "test": "hello world"
}]
```

## IAM Policy

An IAM policy is generated for the Lambda function associated with the SQS event that allows the permissions needed.  You can control and override the IAM policy with normal [IAM Policies]({% link _docs/iam/app/iam-policies.md %}) if needed though.

## Troubleshooting

If you get an error message about `Invalid request provided: Queue visibility timeout` like this:

    05:50:35PM CREATE_FAILED AWS::Lambda::EventSourceMapping HandleEventSourceMapping Resource handler returned message: "Invalid request provided: Queue visibility timeout: 30 seconds is less than Function timeout: 60 seconds (Service: Lambda, Status Code: 400, Request ID: 2a7e4692-70fe-45eb-8fd3-06f20692af1e)" (RequestToken: 414a433a-21a3-da18-676e-fd00001fded2, HandlerErrorCode: InvalidRequest)

This means the **SQS Queue Default visibility timeout** is less than the **Lambda Function timeout**. You have to decrease the Lambda Function timeout or increase the SQS Queue timeout.

