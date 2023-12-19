---
title: DynamoDB Events
categories: events
order: 3
---

Jets supports [DynamoDB Stream Events](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html) as a Lambda trigger. When items in your DynamoDB tables are modified, it will trigger a Lambda function to run.  The Lambda function has access to the record data via `event`.

<div class="video-box"><div class="video-container"><iframe src="https://www.youtube.com/embed/KciTGXq3msM" frameborder="0" allowfullscreen=""></iframe></div></div>

## Example

Generate code.

    jets generate:event clerk --trigger dynamodb --method file

It looks something like this.

Here is an example connecting an existing DynamoDB table's stream to a Lambda function in a [Event]({% link _docs/events.md %})

app/events/clerk_event.rb

```ruby
class ClerkEvent < ApplicationEvent
  dynamodb_event "test-table" # existing table: demo-dev_test-table
  def file
    puts "event #{JSON.dump(event)}"
  end
end
```

**Note**: The dynamodb table name is prefixed with the project namespace as of Jets 5. For example: `test-table => demo-dev_test-table`. You can adjust this behavior with `config.events.dynamodb.table_namespace`. See: [Config Reference]({% link _docs/config/reference.md %}).

Here's the DynamoDB Lambda function trigger.

![](/img/docs/dynamodb-trigger.png)

Note you must enable DynamoDB streaming for the table yourself first.  Refer to the "Enabling DynamoDB Streams" section on how to do this.

## Create Table

Notice how the table name is "namespaced" with the `demo-dev` prefix.

    aws dynamodb create-table --table-name demo-dev_test-table --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --billing-mode PAY_PER_REQUEST

## Enabling DynamoDB Streams

Here's where you enable streams with the DynamoDB console.

![](/img/docs/dynamodb-stream.png)

Here's also an example of how to enable streams with the [aws dynamodb update-table](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/update-table.html) cli.

    aws dynamodb update-table --table-name demo-dev_test-table --stream-specification "StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES"

**Note**: When you enable streams, AWS generates a unique latest stream ARN. The Jets `dynamodb_event` uses the AWS SDK to auto-detect this ARN. If you disable the stream and re-enable the stream then the ARN changes. You can redeploy so that the latest stream ARN is detected and use.

You can also explicitly specify the stream ARN instead of the table name with the `dynamodb_event` method. IE: `dynamodb_event "arn:aws:dynamodb:us-west-2:112233445566:table/demo-dev_test-table/stream/2024-02-11T15:44:30.751"`.

## Putting Data To DynamoDB

Here's an example of updating data in a DynamoDB table [aws dynamodb put-item](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/put-item.html) CLI:

    aws dynamodb put-item --table-name demo-dev_test-table --item '{"id": {"S": "id-1"}, "name": {"S": "name-1"}}'

## Tailing Logs

It helps to tail the logs and watch the event as it comes through.

    jets logs -f -n clerk_event-file

## Event Payload

Here an example of what the event payload looks like.

```json
{
    "Records": [
        {
            "eventID": "1a87201789a6e14315b8038ebbd3b99d",
            "eventName": "MODIFY",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-west-2",
            "dynamodb": {
                "ApproximateCreationDateTime": 1550272599,
                "Keys": {
                    "id": {
                        "S": "1"
                    }
                },
                "NewImage": {
                    "name": {
                        "S": "Tung Nguyen"
                    },
                    "id": {
                        "S": "1"
                    }
                },
                "OldImage": {
                    "name": {
                        "S": "Tung"
                    },
                    "id": {
                        "S": "1"
                    }
                },
                "SequenceNumber": "261800000000059086429283",
                "SizeBytes": 32,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-west-2:112233445566:table/test-table/stream/2019-02-15T23:01:06.871"
        }
    ]
}
```

Here's a screenshot of the event in the CloudWatch Log console.

![](/img/docs/dynamodb-event-log.png)


## IAM Policy

Jets generates an IAM policy for the Lambda function associated with the DynamoDB event that allows the permissions needed.  You can control and override the IAM policy with normal [IAM Policies]({% link _docs/iam/app/iam-policies.md %}) if required, though.

## Debugging

If you are not seeing the event being triggered:

Make sure you have **changed** the value of the item. Stream events will only fire if there are changes. Here's a `edit-1` change to the item.

    aws dynamodb put-item --table-name demo-dev_test-table --item '{"id": {"S": "id-1"}, "name": {"S": "name-1-edit-1"}}'

If you have disabled and reenabled the stream. The stream ARN could be stale. You should redeploy to update it.

You can check the CloudFormation template to confirm the Stream ARN. Look for `Type: AWS::Lambda::EventSourceMapping` and `Properties.EventSourceArn`. That should match the dynamodb table LatestStreamArn.

    aws dynamodb describe-table --table-name demo-dev_test-table | jq

