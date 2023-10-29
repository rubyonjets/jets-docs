---
title: DynamoDB Dynomite ApplicationItem Example
nav_text: ApplicationItem
category: dynamodb-model
order: 1
---

In general, the base model for Dynomite should be:

app/models/application_item.rb

```ruby
class ApplicationItem < Dynomite::Item
end
```

If you do not have one, simply create one.
