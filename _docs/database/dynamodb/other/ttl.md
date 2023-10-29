---
title: DynamoDB Dynomite TTL
nav_text: TTL
category: dynamodb-other
order: 3
---

TTL support is built into DynamoDB already. It's just a matter of setting it up.

## Migration

Create a migration with a `ttl:number` field. We're adding a GSI index also so we can query it quickly. Also, making it a number data type ensures that numbers will be saved to the field, which is required for TTL: [How it works: DynamoDB Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/howitworks-ttl.html)

```ruby
class CreatePosts < Dynomite::Migration
  def up
    create_table :posts do |t|
      t.partition_key :id
      t.add_gsi "ttl:number"
    end
  end
end
```

## Model

Set an expiration time for each item. The value needs to be in epoch time. For Ruby, that's simply a `.to_i` on a Time object.

app/models/post.rb

```ruby
class Post < ApplicationItem
  field :ttl, type: :integer, default: -> { 1.hour.from_now.to_i }
end
```

## Enable

Enable TTL on the AWS DynamoDB Side: [Enabling Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/time-to-live-ttl-how-to.html)

    aws dynamodb update-time-to-live --table-name demo-dev_posts --time-to-live-specification "Enabled=true, AttributeName=ttl"

To confirm

    $ aws dynamodb describe-time-to-live --table-name demo-dev_posts
    {
        "TimeToLiveDescription": {
            "AttributeName": "ttl",
            "TimeToLiveStatus": "ENABLED"
        }
    }

You can also use a migration to update the table time to live setting, see: [Dynomite Migrations Time to Live]({% link _docs/database/dynamodb/migration/ttl.md %}).