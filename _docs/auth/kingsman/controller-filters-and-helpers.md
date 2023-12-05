---
title: "Kingsman: Controller Filters and Helpers"
nav_text: Helpers
category: kingsman
order: 2
---

Kingsman will create some helpers to use inside your controllers and views. To set up a controller with user authentication, just add this before_action (assuming your kingsman model is 'User'):

```ruby
before_action :authenticate_user!
```

Note that `protect_from_forgery` is not longer prepended to the `before_action` chain, so if you have set `authenticate_user` before `protect_from_forgery`, your request will result in "Can't verify CSRF token authenticity." To resolve this, either change the order in which you call them, or use `protect_from_forgery prepend: true`.

If your kingsman model is something other than User, replace `_user` with `_yourmodel`. The same logic applies to the instructions below.

To verify if a user is signed in, use the following helper:

```ruby
user_signed_in?
```

For the current signed-in user, this helper is available:

```ruby
current_user
```

You can access the session for this scope:

```ruby
user_session
```

After signing in a user, confirming the account or updating the password, Kingsman will look for a scoped root path to redirect to. For instance, when using a `:user` resource, the `user_root_path` will be used if it exists; otherwise, the default `root_path` will be used. This means that you need to set the root inside your routes:

```ruby
root to: 'home#index'
```

You can also override `after_sign_in_path_for` and `after_sign_out_path_for` to customize your redirect hooks.

Here's a summary of the helpers:

```ruby
before_action :authenticate_user!
user_signed_in?
current_user
user_session
```

If your Kingsman model is called `Member` instead of `User`, then the helpers available are:

```ruby
before_action :authenticate_member!
member_signed_in?
current_member
member_session
```

## Example View Code

You can add the helpers to your view to for signin and signout links. Example:

app/views/layouts/application.html.erb

```html
<div class="nav">
  <ul>
    <li><a href="/">Home</a></li>
    <% if user_signed_in? %>
      <li><%= link_to "Logout", destroy_session_path(current_user), method: :delete %></li>
    <% else %>
      <li><%= link_to "Login", new_session_path(:user) %></li>
      <li><%= link_to "Signup", new_registration_path(:user) %></li>
    <% end %>
  </ul>
</div>
```

