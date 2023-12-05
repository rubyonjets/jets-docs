---
title: DynamoDB Dynomite Config Reference
nav_text: Config Reference
category: dynamodb
order: 88
---

config/initializers/dynomite.rb

```ruby
Dynomite.configure do |config|
  config.default_count_method = :item_count # use fast count lookup, may be stale for 6 hours
  config.warn_slow = false # disable slow warning if it's annoying
end
```

## Reference

The table below covers each setting. The `config.` portion is not shown for conciseness. IE: `namespace` vs `config.namespace`.

Name | Default | Description
--- | --- | ---
default_count_method | :scan_count | Can be fast `item_count` or slow `scan_count`. The `item_count` method will do a fast count lookup, though the count may be stale for up to 6 hours. The `scan_count` method will do an accurate count but does a `scan`, which is slow and not recommended.
default_field_type | :infer | The default [field type]({% link _docs/database/dynamodb/model/field.md %}) option. By default, this is `:infer`. This means aws-sdk-dynamodb handle the typecasting via inference of the value itself. This allows you to save array, set, and map "types". If you change this to `:string` then a `.to_s` is used to typecast and will force the value to a String.
endpoint | nil | Useful if you want to adjust the endpoint to a local DynamoDB server.
log_level | nil | Defaults to :debug in JETS_ENV=development and :info otherwise. With debug, you'll see all DynamoDB API requests.
logger | Dynomite::Logger.new($stderr) | The default Dynomite::Logger is shows simpflied and clean output without timestamps. You can use your own custom logger to override this.
namespace | dynomite | The namespace to use as the prefix for table names. You should set this `initializers/dynomite.rb` as `Jets.project_namespace`
namespace_separator | _ | The namespace separator between the namespace and table name. IE: demo-dev_posts. You should use the default.
random_sort_key_type | :string | :string or :number. The random id is generated for the sort key when not explicitly set. The number will always start with a non-zero.
undeclared_field_behavior | :warn | Controls how dynomite behaves when an undeclared field value is assigned to attributes and saved. More docs: []({% link _docs/database/dynamodb/model/field.md %}).
update_strategy | :put_item | The update strategy to use. Dynomite will use either a [put_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#put_item-instance_method) or [update_item](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#update_item-instance_method) to save the data to the table. The `update_item` is more efficient as only changed attributes are sent over the wire. Important: `update_item` is an experimental setting. Assigning attributes with the bracket notation, IE: `post[:title] = "value"`, will not mark attributes as changed and so they would not be saved with `update_item`. Since other libraries out of dynomite's control might assign with the bracket notation directly, it may cause some confusing behavior with `update_item`. Additionally, associations do not currently work with `update_item` for the same reason.
warn_slow | true | Print warning for slow scan operations.
