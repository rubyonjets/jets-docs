---
title: "Kingsman: Strong Parameters"
nav_text: Parameters
category: kingsman
order: 4
---

When you customize your own views, you may end up adding new attributes to forms.

There are just three actions in Kingsman that allow any set of parameters to be passed down to the model, therefore requiring sanitization. Their names and default permitted parameters are:

* `sign_in` (`Kingsman::SessionsController#create`) - Permits only the authentication keys (like `email`)
* `sign_up` (`Kingsman::RegistrationsController#create`) - Permits authentication keys plus `password` and `password_confirmation`
* `account_update` (`Kingsman::RegistrationsController#update`) - Permits authentication keys plus `password`, `password_confirmation` and `current_password`

In case you want to permit additional parameters (the lazy way™), you can do so using a simple before action in your `ApplicationController`:

```ruby
class ApplicationController < Jets::Controller::Base
  before_action :configure_permitted_parameters, if: :kingsman_controller?

  protected

  def configure_permitted_parameters
    kingsman_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end
end
```

The above works for any additional fields where the parameters are simple scalar types. If you have nested attributes (say you're using `accepts_nested_attributes_for`), then you will need to tell kingsman about those nestings and types:

```ruby
class ApplicationController < Jets::Controller::Base
  before_action :configure_permitted_parameters, if: :kingsman_controller?

  protected

  def configure_permitted_parameters
    kingsman_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, address_attributes: [:country, :state, :city, :area, :postal_code]])
  end
end
```

Kingsman allows you to completely change Kingsman defaults or invoke custom behavior by passing a block:

To permit simple scalar values for username and email, use this

```ruby
def configure_permitted_parameters
  kingsman_parameter_sanitizer.permit(:sign_in) do |user_params|
    user_params.permit(:username, :email)
  end
end
```

If you have some checkboxes that express the roles a user may take on registration, the browser will send those selected checkboxes as an array. An array is not one of Strong Parameters' permitted scalars, so we need to configure Kingsman in the following way:

```ruby
def configure_permitted_parameters
  kingsman_parameter_sanitizer.permit(:sign_up) do |user_params|
    user_params.permit({ roles: [] }, :email, :password, :password_confirmation)
  end
end
```

Jets leverages Rails for StrongParameters support. So for the list of permitted scalars, and how to declare permitted keys in nested hashes and arrays, see [StrongParameters](https://github.com/rails/strong_parameters#nested-parameters).

If you have multiple Kingsman models, you may want to set up a different parameter sanitizer per model. In this case, we recommend inheriting from `Kingsman::ParameterSanitizer` and adding your own logic:

```ruby
class User::ParameterSanitizer < Kingsman::ParameterSanitizer
  def initialize(*)
    super
    permit(:sign_up, keys: [:username, :email])
  end
end
```

And then configure your controllers to use it:

```ruby
class ApplicationController < Jets::Controller::Base
  protected

  def kingsman_parameter_sanitizer
    if resource_class == User
      User::ParameterSanitizer.new(User, :user, params)
    else
      super # Use the default one
    end
  end
end
```

The example above overrides the permitted parameters for the user to be both `:username` and `:email`. The non-lazy way to configure parameters would be by defining the before filter above in a custom controller. We detail how to configure and customize controllers in some sections below.
