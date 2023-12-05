---
title: DynamoDB Dynomite Essentials
nav_text: Essentials
category: dynamodb
order: 2
---

Here are some DynamoDB essentials to help you learn how to use Dynomite better.

## What is DynamoDB?

DynamoDB is a NoSQL database.

* It does not rely on a traditional relational data model
* It stores data in a key-value format
* It's schemaless

## Thoughts

DynamoDB works differently from a traditional SQL database server. Schemas do not have to be defined ahead of time. A lot of people emphasize that this is a benefit. In some ways, I agree, but I also think there are some cons.

Pros:

* You can "add" columns on-the-fly by simply inserting data with the new columns. Since there is no schema, you don't have to worry about migrations to add a column to a table.
* Adding columns on the fly is a huge benefit for large databases. However, most web apps are not large enough to worry about it.
* Adding indexes is an asynchronous operation that does not lock other database operations. However, adding indexes can take some time. See [Wait Times]({% link _docs/database/dynamodb/other/wait-times.md %}).

Cons:

* Adding a column is not a big deal for most small and medium size database sizes. Relational databases perform just fine, are more common, and are well understood.
* Schemaless can be too loose. You can accidentally insert data with a "new column," and it's available. This can create messy data. The pro can also be a con. Dynomite helps prevent this with different [undeclared fields behaviors]({% link _docs/database/dynamodb/model/field.md %}).
* To use the database in a performant way means you must use the [query](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method) api call instead of the [scan](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#scan-instance_method) call. You must be explicit about it. Dynomite helps with this by being smart about querying by automatically discovering indexes and uses the `query` when possible.
* Adding indexes can take a while, IE: 8m+ for small tables, and must be added sequentially.
* Cost: AWS DynamoDB specifically can cost a lot of money. GSI indexes are essentially copies of the table. It can double the storage costs for that table. Also, provisioned throughput costs money. For small tables, using on-demand throughput can save money.

Even though I've listed more cons than pros here, DynamoDB can work quite well for your use case, and Dynomite helps improve the experience quite a bit.
