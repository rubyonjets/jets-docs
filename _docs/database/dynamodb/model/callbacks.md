---
title: DynamoDB Dynomite Model Callbacks
nav_text: Callbacks
category: dynamodb-model
order: 3
---

Dynomite provides support for callbacks by leveraging ActiveModel.

These callbacks are supported:

* save (before, after, around)
* create (before, after, around)
* update (before, after, around)
* validation (before, after)
* destroy (before, after, around)
* touch (after)
* initialize (after)
* find (after)

Example:

```ruby
class User < ApplicationItem
  before_save :set_default_password
  after_create :notify_friends
  after_destroy :delete_addresses
end
```

## Callback Ordering

Callbacks run in the following order.

Creating an Object

    before_validation
    after_validation
    before_save
    around_save
    before_create
    around_create
    after_create
    after_save

Updating an Object

    before_validation
    after_validation
    before_save
    around_save
    before_update
    around_update
    after_update
    after_save

Destroying an Object

    before_destroy
    around_destroy
    after_destroy

## Related

- [ActiveRecord Available Callbacks](https://guides.rubyonrails.org/active_record_callbacks.html#available-callbacks)
- [API Docs Callbacks](https://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)
