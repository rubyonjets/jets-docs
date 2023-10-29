---
title: DynamoDB Dynomite Querying Find With Event
nav_text: Find With Event
category: dynamodb-querying
order: 5
---

If you're using [DynamoDB Events]({% link _docs/events/dynamodb.md %}), it's useful to load the JSON event to a model object so it can be easier to work with.

## Example Event Payload

The JSON stream event structure sent from DynamoDB stream looks something like this:

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
                        "S": "post-1"
                    }
                },
                "NewImage": {
                    "name": {
                        "S": "Post 1"
                    },
                    "id": {
                        "S": "post-1"
                    }
                },
                "OldImage": {
                    "name": {
                        "S": "Post 1 edit1"
                    },
                    "id": {
                        "S": "post-1"
                    }
                },
                "SequenceNumber": "261800000000059086429283",
                "SizeBytes": 32,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-west-2:112233445566:table/demo-dev_posts/stream/2019-02-15T23:01:06.871"
        }
    ]
}
```

## Example

You can use the `find_all_with_stream_event` to load the item as a model object.

app/jobs/clerk_job.rb

```ruby
class ClerkJob < ApplicationJob
  dynamodb_event "posts" # namespace automatically prepended, IE: demo-dev_posts
  managed_iam_policy("AmazonDynamoDBReadOnlyAccess")
  def file
    puts "event #{JSON.dump(event)}"
    posts = Post.find_all_with_stream_event(event)
    post = posts.first
    puts "post.inspect #{post.inspect}"
    # do something with post
  end
end
```

The `Post.find_all_with_stream_event` loads post model items. It does this by using `Keys` from the event payload. Note, it's a "fresh" load of the items. The attributes from the stream event itself is not used. If you need to use the stream event attributes, you should use the original event payload directly.

The `find_all_with_stream_event` internally uses [batch_get_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#batch_get_item-instance_method) to fetch the items. Hence, the `AmazonDynamoDBReadOnlyAccess` IAM permission is needed so that the lambda function has access to get the item.

The `post.inspect` looks something like this:

```ruby
#<Post:0x00007fde51d1c4a0 @attrs={"updated_at"=>"2023-08-26T18:35:10Z", "created_at"=>"2023-08-26T18:35:10Z", "id"=>"post-1", "body"=>"body 1", "title"=>"Post 1 edit1"}>
```

## Consistent Read Note

The stream `event` payload can contain multiple changed records. The changes can happen rapidly enough on the same key that the event can contain duplicate keys. IE: `[{ "id": { "S": "post-1" }, "id": { "S": "post-1" } }]`. The `find_all_with_stream_event` method performs a `uniq` on the keys to avoid `batch_get_item` raising an error.

Since events can be rapid, you may want to use the `consistent_read: true` option to ensure the latest item is loaded from the database. It'll cost twice as much to use consistent_read.  In my own testing, found that did not need consistent read for the latest data but your miles may vary. Example:

```ruby
Post.find_all_with_stream_event(event, consistent_read: true)
```
