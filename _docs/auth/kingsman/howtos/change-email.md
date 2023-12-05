---
title: "Kingsman How To: Change Email Feature"
nav_text: Change Email
category: kingsman-howtos
order: 4
---

A common authentication feature is the ability to allow users to change their own email. We'll show you an example implementation of this feature.

Note: This implementation assumes the `confirmable` module has been enabled.

## Controller

app/controllers/account/emails_controller.rb

```ruby
class Account::PasswordsController < ApplicationController
  before_action :authenticate_user!

  def edit
  end

  def update
    if current_user.update_with_password(user_params)
      bypass_sign_in current_user
      redirect_to root_path, :notice => "You updated your account successfully, but we need to verify your new email address. Please check your email and follow the confirmation link to confirm your new email address."
    else
      render :edit
    end
  end

private
  def user_params
    params.require(:user).permit(:current_password, :email)
  end
end

```

Note, `current_user.update_with_password(user_params)` is provided by Kingsman and requires the user to specify their current password to perform the update.

## Routes

config/routes.rb

```ruby
Jets.application.routes.draw do
  namespace :account do
    resource :emails, only: %w[edit update]
  end
end
```

## Views

app/views/account/passwords/edit.html.erb

```html
<h1>Change email</h1>
<%= render partial: "shared/error_messages", locals: {model: current_user} %>

<%= form_with(model: current_user, url: account_email_path) do |form| %>
  <div class="form-group">
    <%= form.label :current_password %>
    <%= form.password_field :current_password, class: "form-control" %>
    <small class="form-text">Note: Provide the current password to change the email.</small>
  </div>

  <div class="form-group">
    <%= form.label :email, "Current Email" %>
    <%= form.email_field :email, class: "form-control" %>
    <small class="form-text">Note: Changing the current email will send an email to confirm.</small>
  </div>

  <% unless current_user.unconfirmed_email.blank? %>
  <div class="form-group">
    <%= form.label :unconfirmed_email, "New Unconfirmed Email" %>
    <%= current_user.unconfirmed_email %>
    <small class="form-text">This email is pending confirmation. Please check the email for confirmation instructions.</small>
  </div>
  <% end %>

  <div class="actions">
    <%= form.submit "Change my email" %>
  </div>
<% end %>
```

{% include kingsman/shared-error-messages.md %}
