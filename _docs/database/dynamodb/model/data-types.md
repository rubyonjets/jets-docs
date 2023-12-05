---
title: DynamoDB Dynomite Model Data Types
nav_text: Data Types
category: dynamodb-model
order: 5
---

## Data Types

DynamoDB has [data types](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypeDescriptors). They are quite flexible.

* S – String
* N – Number
* B – Binary
* BOOL – Boolean
* NULL – Null
* M – Map
* L – List
* SS – String Set
* NS – Number Set
* BS – Binary Set

You can store whatever data-type value you wish in the "columns" when you add data. It's up to you. Dynomite typecasts base on the value that's assigned to the attribute. The aws-sdk-dynamodb underlying library handles most of the typecast heavy lifting.

Note: If you're using [aws dynamodb put-item](https://docs.aws.amazon.com/cli/latest/reference/dynamodb/put-item.html#examples) CLI, you have to provide a raw API payload schema format.

item.json

```json
{
    "Artist": {"S": "No One You Know"},
    "SongTitle": {"S": "Call Me Today"},
    "AlbumTitle": {"S": "Greatest Hits"}
}
```

With the Ruby SDK though, you simply assign the values and the SDK infers the type from the values.

## Type Matching

Generally, you can store any value for any field on per-item level. However, there is one example where the type must match. An error will be raised from the AWS DynamoDB API if you try to save the wrong type for the `partition_key` and `sort_key`. They must match with the attribute_type. An example is provided in [Saving]({% link _docs/database/dynamodb/saving.md %}#saving-with-correct-type-for-partition-and-sort-key). This type enforcement also applies for indexes.

