---
title: DynamoDB Dynomite Migrations Low-Level Client
nav_text: Client
category: migration
order: 6
---

If the create_table, update_table, and delete_table Dynomite Migration DSL methods are insufficient for some reason.  You can drop down to the low-level client and call the Ruby dynamodb client methods like [create_table](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#create_table-instance_method) directly.

```ruby
class CreateUsers < Dynomite::Migration
  def up
    client.create_table(
      billing_mode: "PAY_PER_REQUEST",
      table_name: "demo-dev_users",
      key_schema: [{attribute_name: "id", key_type: "HASH"}],
      global_secondary_indexes: [{
        key_schema: [{attribute_name: "updated_at", key_type: "HASH"}],
        index_name: "updated_at-index",
        projection: {projection_type: "ALL"},
      }],
      attribute_definitions: [
        {attribute_name: "id", attribute_type: "S"},
        {attribute_name: "updated_at", attribute_type: "S"},
      ]
    )
    waiter.wait("demo-dev_user")
    # Same as above but using the DSL:
    # create_table :users do |t|
    #   t.partition_key :id
    #   t.add_gsi :updated_at
    # end
  end
end
```

When using the dynamodb client directly, you must fully qualify the table name with the namespace: `demo-dev_users`. You also should call the `waiter.wait`.  The next migration, if it's dependent, may not work since the `create_table` method is async.
