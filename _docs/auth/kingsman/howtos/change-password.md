---
title: "Kingsman How To: Change Password Feature"
nav_text: Change Password
category: kingsman-howtos
order: 5
---

A common authentication feature is the ability to allow users to change their own password. We'll show you an example implementation of this feature.

## Controller

app/controllers/account/passwords_controller.rb

```ruby
class Account::PasswordsController < ApplicationController
  before_action :authenticate_user!

  def edit
  end

  def update
    if current_user.update_with_password(user_params, reject_blank_password: false)
      bypass_sign_in current_user
      redirect_to root_path, :notice => "Your Password has been updated!"
    else
      render :edit
    end
  end

private
  def user_params
    params.require(:user).permit(:current_password, :password, :password_confirmation)
  end
end
```

Note, `current_user.update_with_password(user_params, reject_blank_password: false)` is provided by Kingsman and requires the user to specify their current password to perform the update.

## Routes

config/routes.rb

```ruby
Jets.application.routes.draw do
  namespace :account do
    resource :passwords, only: %w[edit update]
  end
end
```

## Views

app/views/account/passwords/edit.html.erb

```html
<h1>Change password</h1>
<%= render partial: "shared/error_messages", locals: {model: current_user} %>

<div class="default-form">
<%= form_with(model: current_user, url: account_password_path) do |form| %>
  <div class="form-group">
    <%= form.label :current_password, "Current password" %>
    <%= form.password_field :current_password, class: "form-control" %>
  </div>

  <div class="form-group">
    <%= form.label :password, "New password" %>
    <%= form.password_field :password, class: "form-control" %>
  </div>

  <div class="form-group">
    <%= form.label :password_confirmation, "Confirm new password" %>
    <%= form.password_field :password_confirmation, class: "form-control" %>
  </div>

  <div class="actions">
    <%= form.submit "Change my password" %>
  </div>
<% end %>
</div>
```

{% include kingsman/shared-error-messages.md %}
