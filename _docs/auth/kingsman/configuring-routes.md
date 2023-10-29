---
title: "Kingsman: Configuring Routes"
nav_text: Routes
category: kingsman
order: 7
---

Kingsman also ships with default routes. If you need to customize them, you should probably be able to do it through the kingsman_for method. It accepts several options like `:class_name`, `:path_prefix` and so on, including the possibility to change path names for I18n:

config/routes.rb

```ruby
Jets.application.routes.draw do
  kingsman_for :users, path: 'auth', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register', sign_up: 'cmon_let_me_in' }
end
```

If you have the need for more deep customization, for instance to also allow "/sign_in" besides "/users/sign_in", all you need to do is create your routes normally and wrap them in a `kingsman_scope` block in the router:

```ruby
Jets.application.routes.draw do
  kingsman_scope :user do
    get 'sign_in', to: 'kingsman/sessions#new'
  end
end
```

This way, you tell Kingsman to use the scope `:user` when "/sign_in" is accessed. Notice `kingsman_scope` is also aliased as `as` in your router.

Please note: You will still need to add `kingsman_for` in your routes in order to use helper methods such as `current_user`.

```ruby
Jets.application.routes.draw do
  kingsman_for :users, skip: :all
end
```