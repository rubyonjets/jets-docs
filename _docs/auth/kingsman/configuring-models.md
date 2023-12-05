---
title: "Kingsman: Configuring Models"
nav_text: Models
category: kingsman
order: 3
---

The Kingsman method in your models also accepts some options to configure its modules. For example, you can choose the cost of the hashing algorithm with:

app/models/user.rb

```ruby
class User < ApplicationRecord
  kingsman :database_authenticatable, :registerable, :confirmable, :recoverable, stretches: 13
end
```

Besides `:stretches`, you can define `:pepper`, `:encryptor`, `:confirm_within`, `:remember_for`, `:timeout_in`, `:unlock_in` among other options. For more details, see the initializer file that was created when you invoked the `kingsman:install` generator described above. This file is usually located at `config/initializers/kingsman.rb`.
