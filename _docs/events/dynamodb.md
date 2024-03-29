---
title: DynamoDB Events
categories: events
order: 3
---

Jets supports [DynamoDB Stream Events](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.html) as a Lambda trigger. When items in your DynamoDB tables are modified, it will trigger a Lambda function to run.  The Lambda function has access to the record data via `event`.

<div class="video-box"><div class="video-container"><iframe src="https://www.youtube.com/embed/KciTGXq3msM" frameborder="0" allowfullscreen=""></iframe></div></div>

## Example

Generate code.

    jets generate job clerk --type dynamodb --name file

It looks something like this.

Here is an example connecting an existing DynamoDB table's stream to a Lambda function in a [Job]({% link _docs/jobs.md %})

app/jobs/clerk_job.rb

```ruby
class ClerkJob < ApplicationJob
  dynamodb_event "test-table" # existing table: demo-dev-test-table
  def file
    puts "event #{JSON.dump(event)}"
  end
end
```

**Note**: The dynamodb table name is prefixed with the project namespace as of Jets 5 via [Dynomite 2]({% link _docs/database/dynamodb.md %}). For example: `test-table => demo-dev-test-table`. You can adjust this behavior with `config.events.dynamodb.table_namespace`. See: [Config Reference]({% link _docs/config/reference.md %}).

Here's the DynamoDB Lambda function trigger.

![](/img/docs/dynamodb-trigger.png)

Note you must enable DynamoDB streaming for the table yourself first.  Refer to the "Enabling DynamoDB Streams" section on how to do this.

## Enabling DynamoDB Streams

Here's where you enable streams with the DynamoDB console.

![](/img/docs/dynamodb-stream.png)

Here's also an example of how to enable streams with the [aws dynamodb update-table](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/update-table.html) cli.

    aws dynamodb update-table --table-name demo-dev-test-table --stream-specification "StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES"


## Putting Data To DynamoDB

Here's an example of updating data in a DynamoDB table [aws dynamodb put-item](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/put-item.html) CLI:

    aws dynamodb put-item --table-name demo-dev-test-table --item '{"id": {"S": "id-1"}, "name": {"S": "name-1"}}'

## Tailing Logs

It helps to tail the logs and watch the event as it comes through.

    jets logs -f -n clerk_job-file

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

Jets generates an IAM policy for the Lambda function associated with the DynamoDB event that allows the permissions needed.  You can control and override the IAM policy with normal [IAM Policies]({% link _docs/iam-policies.md %}) if required, though.

## Related

* [Dynomite find_all_with_stream_event]({% link _docs/database/dynamodb/querying/find-with-event.md %})
