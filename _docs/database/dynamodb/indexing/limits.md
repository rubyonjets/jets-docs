---
title: DynamoDB Dynomite Indexes Limits
nav_text: Limits
category: dynamodb-indexes
order: 3
---

## Creating Indexes Takes Time

Creating global secondary indexes can take a while, generally around 5-10 minutes. See: [Wait Times]({% link _docs/database/dynamodb/other/wait-times.md %}). Additionally, you cannot create another index until this process is completed. You can create and delete one index at the same time, though. So two index operations, one for create and one for delete. We'll show you how to add indexes in these docs: [Adding Indexes]({% link _docs/database/dynamodb/indexing.md %})


## Indexes: Limits and Maxes

Max indexes for each type, see: [create_table](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#create_table-instance_method)

* LSI: Max 5
* GSI: Max 20

Additional notes:

* LSI **must** have table's partition_key as one of its index keys. LSIs require a sort key. So, LSIs must be composite keys.
* LSI: There is no additional storage cost
* LSI: There is a 10 GB size limit per partition key value. After that, you won't be able to add more items. See: [create_table docs](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#create_table-instance_method). If you think the LSI partition key and sort key can be greater than 10GB, it's probably safer to use the more expensive GSI indexes.
* GSI: There is an additional storage cost. GSIs are essentially copies of the table. So it doubles the cost of storage. You can limit costs by projecting only specific attributes.
