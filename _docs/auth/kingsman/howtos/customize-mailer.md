---
title: "Kingsman How To: Customize Mailer Templates"
nav_text: Customize Mailer
category: kingsman-howtos
order: 1
---

## Different Ways to Change Templates

There are many different ways to change the mailer template text. We'll cover a few of them.

## Mailer Templates

❯ jets generate kingsman:views -v mailer
      create    app/views/kingsman/mailer
      create    app/views/kingsman/mailer/confirmation_instructions.html.erb
      create    app/views/kingsman/mailer/email_changed.html.erb
      create    app/views/kingsman/mailer/password_change.html.erb
      create    app/views/kingsman/mailer/reset_password_instructions.html.erb
      create    app/views/kingsman/mailer/unlock_instructions.html.erb

This copies over the templates internally from the kingsman gem to your app. Keep the views you want to customize and remove the ones you don't need.  For example, you do not need the generated shared views for mailers.

    rm -rf app/views/kingsman/shared

Let's say you only want to customize the reset password instruction template. That'll be the only one you'll keep.

    app/views/kingsman/mailer/reset_password_instructions.html.erb

## Internationalization YAML File

We can adjust all `en.kingsman.mailer.confirmation_instructions` settings [config/locales/en.yml](https://github.com/rubyonjets/kingsman/blob/main/config/locales/en.yml). Sometimes, that may be enough for your needs.  If it's not, using custom mailers can help.

## Custom Mailer Class

app/mailers/custom_kingsman_mailer.rb

```ruby
class CustomMailer < Kingsman::Mailer
  # Prepend the subject with My Website
  def subject_for(key)
    "My Website " + super
  end
end
```

This will change the subject of the emails sent by Kingsman so that they are prefixed with "My Website ".

Configure kingsman initializer so it'll use the `CustomMailer`

config/initializers/kingsman.rb

```ruby
Kingsman.setup do |config|
  config.mailer_sender = 'noreply@boltops.com'
  # ...
  config.mailer = 'CustomMailer'
end
```

Here's source code of the [Kingsman::Mailer](https://github.com/rubyonjets/kingsman/blob/main/app/mailers/kingsman/mailer.rb). Reading it can help understand how else you can customize the mailer and templates.
