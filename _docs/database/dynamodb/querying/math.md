---
title: DynamoDB Dynomite Querying Math Methods
nav_text: Math
category: dynamodb-querying
order: 8
---

Math methods are supported. Examples:

```ruby
Product.count
Product.average(:price)
Product.min(:price)
Product.max(:price)
Product.sum(:price)
```

They can be scoped to a chain also.

```ruby
Product.where(category: "Electronics").count
Product.where(category: "Electronics").average(:price)
Product.where(category: "Electronics").sum(:price)
Product.all.average(:price)
```
