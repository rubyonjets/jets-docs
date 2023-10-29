---
title: DynamoDB Dynomite Model Validations
nav_text: Validations
category: dynamodb-model
order: 3
---

Dynomite provides support for validations by leveraging ActiveModel.

```ruby
class User < ApplicationItem
  validates :name, presence: true
  validates :email, uniqueness: true
end
```

More docs: [Active Record Validations](https://guides.rubyonrails.org/active_record_validations.html).

To bypass validation:

```ruby
user.save(validate: false)
```
