---
title: DynamoDB Dynomite Debugging Tips
nav_text: Debugging
category: dynamodb
order: 9
---

Also, you can configure `Dynomite.config.log_level = :debug`. This will show the raw API request and response payload **within aws-sdk-dynamodb gem**.

config/initializers/dynomite.rb

```ruby
Dynomite.configure do |config|
  config.log_level = :debug
end
```

You can turn on the `DYNOMITE_DEBUG` flag for even more debugging output. Dynomite shows what parameters are being sent by dynomite to the DynamoDB Ruby SDK API.

    export DYNOMITE_DEBUG=1

## Example

    Jets booting up in development mode!
    > Product.where(category: "Electronics", sku: 101).to_a
    Index used primary_key (fields: category, sku))
    Dynomite::Item::Query::Relation#perform query
    {:expression_attribute_names=>{"#category"=>"category", "#sku"=>"sku"},
    :expression_attribute_values=>{":category"=>"Electronics", ":sku"=>101},
    :key_condition_expression=>"#category = :category AND #sku = :sku",
    :table_name=>"demo-dev_products"}
    D, [2023-08-03T22:42:24.610218 #179859] DEBUG -- : query | Request "{\"ExpressionAttributeNames\":{\"#category\":\"category\",\"#sku\":\"sku\"},\"ExpressionAttributeValues\":{\":category\":{\"S\":\"Electronics\"},\":sku\":{\"N\":\"101\"}},\"KeyConditionExpression\":\"#category = :category AND #sku = :sku\",\"TableName\":\"demo-dev_products\"}" | Response "{\"Count\":1,\"Items\":[{\"updated_at\":{\"S\":\"2023-08-03T16:17:50Z\"},\"created_at\":{\"S\":\"2023-08-03T16:17:50Z\"},\"name\":{\"S\":\"Smartphone\"},\"stock_quantity\":{\"N\":\"50\"},\"category\":{\"S\":\"Electronics\"},\"price\":{\"N\":\"500\"},\"sku\":{\"N\":\"101\"}}],\"ScannedCount\":1}"
    =>
    [#<Product:0x00007f14cb52f418
      @attrs={"updated_at"=>"2023-08-03T16:17:50Z", "created_at"=>"2023-08-03T16:17:50Z", "name"=>"Smartphone", "stock_quantity"=>0.5e2, "category"=>"Electronics", "price"=>0.5e3, "sku"=>0.101e3},
      @new_record=false>]
    >

Note there are also `describe_table` calls made to discover indexes and use `query` instead of the `scan` method when possible. Once indexes are discovered, they are cached, and the `describe_table` no longer needs to be called.