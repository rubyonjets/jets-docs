---
title: "Kingsman How To: Email Confirmation"
nav_text: Email Confirmation
category: kingsman-howtos
order: 2
---

The following instructions demonstrate how to enable `:confirmable` in a new or existing application.

Keep in mind that for existing applications with an established user base, active users must be marked as confirmed or they will be unable to log in following activation of the `:confirmable` module.

Confirming existing users is addressed in the migration portion below.

### Modifying the User Model

First, add ``kingsman :confirmable`` to your `models/user.rb` file

```ruby
kingsman :registerable, :confirmable
```

### Create a New Migration

Then, do the migration as:

```
jets generate migration add_confirmable_to_kingsman
```

This will generate ``db/migrate/YYYYMMDDxxx_add_confirmable_to_kingsman.rb``. Add the following to it in order to do the migration.

```ruby
class AddConfirmableToKingsman < ActiveRecord::Migration
  # Note: You can't use change, as User.update_all will fail in the down migration
  def up
    add_column :users, :confirmation_token, :string
    add_column :users, :confirmed_at, :datetime
    add_column :users, :confirmation_sent_at, :datetime
    # add_column :users, :unconfirmed_email, :string # Only if using reconfirmable
    add_index :users, :confirmation_token, unique: true
    # User.reset_column_information # Need for some types of updates, but not for update_all.
    # To avoid a short time window between running the migration and updating all existing
    # users as confirmed, do the following
    User.update_all confirmed_at: DateTime.now
    # All existing user accounts should be able to log in after this.
  end

  def down
    remove_index :users, :confirmation_token
    remove_columns :users, :confirmation_token, :confirmed_at, :confirmation_sent_at
    # remove_columns :users, :unconfirmed_email # Only if using reconfirmable
  end
end
```


You can also generate the corresponding Kingsman views if they have not yet been created:

    jets generate kingsman:views users

Run the migration

    jets db:migrate

Restart the server.

If you are not using :reconfirmable (i.e leave the commented out lines as they are in the change method described above), update the configuration in

config/initializers/kingsman.rb

```ruby
config.reconfirmable = false
```

Before you can actually _send_ the confirmation mail, you need the Kingsman::Mailer or a [custom mailer](https://github.com/plataformatec/kingsman/wiki/How-To:-Use-custom-mailer) configured.

### Redirecting user
If you want to redirect the user to a specific url after they clicked the link in the confirmation email, override the after_confirmation_path_for in your confirmations_controller:

Create a new `confirmations_controller.rb` in `app/controllers` directory:

```ruby
class ConfirmationsController < Kingsman::ConfirmationsController
  private
  def after_confirmation_path_for(resource_name, resource)
    sign_in(resource) # In case you want to sign in the user
    your_new_after_confirmation_path
  end
end
```

In `config/routes.rb`, add this line so that Kingsman will use your custom ConfirmationsController. This assumes Kingsman operates on users table (you may edit to match yours).

config/routes.rb

```ruby
Jets.application.routes.draw do
  kingsman_for :users, controllers: { confirmations: 'confirmations' }
end
````

Restart the web server, and you should have it.

### Allowing Unconfirmed Access
If you want to add a "grace period" where unconfirmed users may still login, use the `allow_unconfirmed_access_for` config option (which defaults to 0):

config/initializers/kingsman.rb

```ruby
config.allow_unconfirmed_access_for = 365.days
```

Alternatively, you may want to skip required confirmation all-together:

app/models/user.rb

```ruby
class User < ApplicationRecord
  protected
  def confirmation_required?
    false
  end
end
```

#### Sending confirmation emails to all existing users

If you want to allow users to log in, but not register as `confirmed?`, do the following:
- enable reconfirmable by creating `unconfirmed_email` column in previous user migration
- set `config.allow_unconfirmed_access_for` to a valid time period

Now, all users will be able to log in and you may send them a confirmation instruction with:

```ruby
User.find_each { |user| user.send_confirmation_instructions }
```

### Forcing email update when using `:reconfirmable`

With `:reconfirmable`, all email updates will require confirmation. If you need to update the email attribute without sending confirmation email, use the `skip_reconfirmation!` method.

```ruby
user = User.first
user.email = 'admin@app.com'
user.skip_reconfirmation!
user.save!
```

## Related Links

* [Kingsman How To: Email Confirmation]({% link _docs/auth/kingsman/howtos/auto-signin-after-email-confirmation.md %})
* This is based on [How To: Add :confirmable to Users](https://github.com/heartcombo/devise/wiki/How-To:-Add-:confirmable-to-Users).
