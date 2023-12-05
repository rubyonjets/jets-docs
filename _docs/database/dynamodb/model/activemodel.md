---
title: DynamoDB Dynomite ActiveModel Compatible
nav_text: ActiveModel
category: dynamodb-model
order: 1
---

Dynomite is [ActiveModel compatible](https://guides.rubyonrails.org/active_model_basics.html). Thanks to this, you can use things like validations an callbacks.

app/models/product.rb

```ruby
class Product < ApplicationItem
  fields :category,
         :sku,
         :name,
         :price
  field :stock_quantity, default: 1

  validates :price, presence: true

  before_save :set_sku
  def set_sku
    self.sku ||= SecureRandom.hex
  end
end
```

You use the `fields` method to declare multiple fields. You can also use the `field` method to declare a single feel with options like `default`.

You can use things like `validates` and `before_save` callbacks just like with ActiveRecord models because Dynomite is ActiveModel compatible.