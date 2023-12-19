---
title: Jets Rails Email Previews
nav_text: Previews
category: email
order: 3
---

Rails supports previewing emails from [localhost:3000/rails/mailers](localhost:3000/rails/mailers). This can be enabled with:

config/environments/development.rb:

```ruby
Rails.application.configure do
  config.action_mailer.show_previews = true # default: false
end
```

## Previewing Emails

Here's an example showing how to use email previews.

    rails new demo
    cd demo
    rails generate migration create_users name:string
    rails db:migrate
    rails generate mailer UserMailer new_user

Then create a preview model with a naming convention in the `app/previews` folder like so.

app/previews/user_mailer_preview.rb:

```ruby
class UserMailerPreview < ActionMailer::Preview
  def new_user
    UserMailer.new_user
  end
end
```

To see the email preview visit: [localhost:3000/rails/mailers/user_mailer/new_user](localhost:3000/rails/mailers/user_mailer/new_user).  You should see something like this:

![](/img/docs/email-preview.png)
