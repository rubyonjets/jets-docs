---
title: DynamoDB Dynomite Model Typecasting
nav_text: Typecasting
category: dynamodb-model
order: 6
---

By default, Dynomite uses aws-sdk-dynamodb to typecast by inferring the type from the value itself. Dynomite can also do some additional typecasting on top of the built-in aws-sdk-dynamodb typecasting.

The aws-sdk-dynamodb typecasting is based on inference of the value itself. For example, if you save a Ruby `float` value, it's typecasted by aws-sdk-dynamodb to a DynamoDB `number`. If you save a Ruby `string` value, it's saved as a DynamoDB `string`. See: [github aws-sdk-dynamodb/attribute_value.rb](https://github.com/aws/aws-sdk-ruby/blob/b5aa04a64aaa273b2528a0bdd097273077984d7c/gems/aws-sdk-dynamodb/lib/aws-sdk-dynamodb/attribute_value.rb#L17-L57). It's all handled transparently for you. Whatever data-type value that's stored is returned later.

## Additional Typecasting

Dynomite performs [additional typecasting](https://github.com/boltops-tools/dynomite/blob/master/lib/dynomite/item/typecaster.rb) for:

* **boolean**: Dynomite typecasts `type: :boolean` for these values. These values `[false, 'false', 'FALSE', 0, '0', 'f', 'F', 'off', 'OFF']` are falsey. All other values are truthy. It also provides an extra boolean `?` method when you set the `type: :boolean`. IE: `published?`. This method does run a `!!` to ensure it returns a Boolean.
* **infer**: Dynomite does not perform typecasting itself. Instead, it uses aws-sdk-dynamodb to handle the typecasting via inference of the value itself. This allows you to save Array, Set, and Map "types". This is the **default_field_type** when you do **not** specific a type in the model field declartion.
* **integer**: Dynomite typecasts `type: :integer` with a `.to_i`. Internally, it's still stored as a native DynamoDB `number`. However, seeing Ruby float numbers when debugging can be annoying. For example, you'll see `0.1e2` vs `10` in a `jets console`. Hence, the value is typecasted to a Ruby Integer. Integer typecasting can also be performed for comparison operations like `Post.where("ttl.lt": Time.now)` for it to work correctly.
* **string**: Dynomite typecasts `type: :string` with a `.to_s`. This forces the value to be a String.
* **time**: Since DynamoDB has no native time type, Dynomite stores a Time object as an ISO 8601 date string, IE: `2023-08-20T21:58:12Z` per [AWS Docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.NamingRulesDataTypes.html#HowItWorks.DataTypes). Dynomite typecasts DateTime to a Time so everything handled as Time internally.

## Typecasting Default

The default type casting behavior is to infer based on the value itself. You can change this with:

config/initializers/dynomite.rb

```ruby
Dynomite.configure do |config|
  config.default_field_type = :infer # :string
end
```

## Attribute Definitions

DynamoDB tables do have some "schema" information. This is in `attribute_definitions`. I believe DynamoDB uses this for optimizations because when you define a index for a field, the attribute definitions must also be provided and a type must be specified. AWS DynamoDB then enforces the type on the field. Because of this, Dynamodb does a final typecast on the value to match what the attribute definition type is, Number, String, Boolean before persisting the data. Otherwise, the value will not be allowed to be saved.
