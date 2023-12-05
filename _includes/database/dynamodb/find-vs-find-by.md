## find vs find_by

The `find` and `find_by` interfaces are different.

* `find` will raise a `Dynomite::Error::RecordNotFound` if the item is not found. `find_by` will return `nil`.
* `find` can be passed a single element, Hash, or multiple elements with the Primary Keys. Underneath the hood `find` only uses [get_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#get_item-instance_method) for fast lookup.
* `find_by` can be passed an Hash. It can use either [get_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#get_item-instance_method) or [where]({% link _docs/database/dynamodb/querying/where.md %}), which can call a [query](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method) or [scan](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#scan-instance_method)