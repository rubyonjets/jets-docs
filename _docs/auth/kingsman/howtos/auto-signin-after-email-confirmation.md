---
title: "Kingsman How To: Automatically Sign In After Email Confirmation"
nav_text: Auto Signin
category: kingsman-howtos
order: 3
---

By default, users are required to sign in after clicking on the email confirmation link. You can do the following if you want the user to be automatically signed after clicking on the confirmation link.

## ConfirmationsController Override

Generate a controller that we'll override.

    ❯ jets generate kingsman:controllers users -c=confirmations
        create  app/controllers/users/confirmations_controller.rb

Override the show logic.

app/controllers/users/confirmations_controller.rb

```ruby
class Users::ConfirmationsController < Kingsman::ConfirmationsController
  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    super do
      sign_in(resource) if resource.errors.empty?
    end
  end
end
```

## Connect Routes

Connect the routes so that the overrides are used.

config/routes.rb

```ruby
Jets.application.routes.draw do
  kingsman_for :users, controllers: {
    confirmations: 'users/confirmations'
  }
end
```

## Finish

That should create a workflow where the user is automatically logged in after clicking the confirmation link.

## Related Links

* This is based on [Automatically sign in after confirm with devise](https://stackoverflow.com/questions/25253039/automatically-sign-in-after-confirm-with-devise)
* [Kingsman How To: Email Confirmation]({% link _docs/auth/kingsman/howtos/email-confirmation.md %})
