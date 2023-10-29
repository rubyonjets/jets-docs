## Primary Key: Partition Key Only or Composite Key with Sort Key

If you're coming from the ActiveRecord, in the relational database world, a "primary key" is a single column that identifies uniqueness. With DynamoDB, there's a primary key also, but you can choose between 2 types of primary keys:

**Primary Key Types:**

1. **Parition Key Only**: One Field Only. This field value must be unique within the table.
2. **Composite Key**: Partition Key + Sort Key. The combination of these fields must be unique within the table.

In general, I prefer creating tables with a Partition Key only because:

* Partition Key Only primary keys are easier to understand. You use it the same conceptually so you would with relational database. This reduce mental overhead makes a difference.
* When querying, with a Primary Key Partition Key Only, you only need to provide one value get the item. With a Composite Key, you have to provide both field values. Even though it's just one extra field, the interface is more cumbersome.
* You can always create a GSI index that is a Composite Key. You can use this to group "categories" and a sort column for filtering together.
* Associations work faster and better for tables with only a Partition Key. Only the Partition Key is stored in the "foreign key" column that Dynomite manages.

When you use a partition_key **only**, the partition_key identifies uniqueness.

With a "composite key", the partition_key acts like a "category". **Both** the partition_key and sort_key are needed to identify uniqueness. A "composite key" is an abstract concept and only exists a result of specifying a sort_key during table creation. When you have a sort key, you will always have a composite key.

This article also has a useful explanation of DynamoDB's partition, sort, and compose keys: [DynamoDB Composite Key - The Ultimate Guide](https://dynobase.dev/dynamodb-composite-key/)

> When you have a composite key on your DynamoDB Table, that will be considered the primary key. In simpler terms, this means when you have a sort key set on your table, all Get, Update, Delete item commands must include both the partition key and sort key. This is because the partition key is no longer considered unique, the composite key is considered unique, and therefore you need both elements to identify the specific item you are referring to.
