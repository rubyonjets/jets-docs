---
title: "Kingsman How To: Omniauth"
nav_text: Omniauth
category: kingsman-howtos
order: 10
---

{% include videos/learn.md
     url="ruby-on-jets-guide/lessons/kingsman-omniauth-github-with-ruby-on-jets"
     img="https://learn-uploads.boltops.com/b1tczu3z9ary34dk4jv0csiwa5cb"
     premium=true %}

These docs show provide a cheatsheet with set up steps for OmniAuth with Kingsman and Jets.

## GitHub OAuth App

Set up the GitHub OAuth App. Go to **Settings -> Developer Settings -> OAuth Apps -> New OAuth App**. Here are the important URLs:

* Homepage URL: http://localhost:8888
* Authorization callback URL: http://localhost:8888/users/auth/github/callback

The callback URL is where the strategy is directed to after the authentication process whether or not the user passes the authentication. Note the GitHub Client ID and Client Secret.

## Gems

Setup the `Gemfile`

Gemfile

```ruby
gem 'omniauth-github'
gem 'omniauth-jets_csrf_protection'
```

## Dotenv Client Secret

Save the Client ID and Client Secret from eariler to a .env file. We'll use the development one here.

.env.development

```bash
GITHUB_CLIENT_ID=EXAMPLE947ebEXAMPLE
GITHUB_CLIENT_SECRET=EXAMPLE7a83534ed1917d43730ac3d6c4EXAMPLE
```

## Kingsman Initializer

Setup the kingsman initializer:

config/initializers/kingsman.rb

```ruby
Kingsman.setup do |config|
  config.omniauth :github, ENV['GITHUB_CLIENT_ID'], ENV['GITHUB_CLIENT_SECRET'], scope:'user,public_repo'
end
```

## Migration

Create a migration to add the

    jets generate migration update_users

The migration will looks something like this:

```ruby
class UpdateUsers < ActiveRecord::Migration[7.0]
  def change
    add_column(:users, :provider, :string, limit: 50)
    add_column(:users, :provider_uid, :string, limit: 50)
  end
end
```

## Model

Update your user model to be `omniauthable`

```ruby
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: [:github] # add this line

  def self.create_from_provider_data(provider_data)
    where(provider: provider_data.provider, provider_uid: provider_data.uid).first_or_create do |user|
      user.email = provider_data.info.email
      user.password = Kingsman.friendly_token[0, 20]
    end
  end
end
```

## Routes

config/routes.rb

```ruby
Jets.application.routes.draw do
  kingsman_for :users, controllers: {omniauth_callbacks: 'omniauth'}
end
```

## Controller

```ruby
class OmniauthController < Kingsman::OmniauthCallbacksController
  def github
    @user = User.create_from_provider_data(request.env['omniauth.auth'])
    if @user.persisted?
      sign_in_and_redirect @user
      set_flash_message(:notice, :success, kind: 'Github') if is_navigational_format?
    else
      flash[:error]='There was a problem signing you in through Github. Please register or try signing in later.'
      redirect_to new_user_registration_url
    end
  end

  def failure
    flash[:error] = 'There was a problem signing you in. Please register or try signing in later.'
    redirect_to new_user_registration_url
  end
end
```

## Setup Complete

The setup is now complete. You should be able to go to the login page and there will be "Sign in with GitHub" button at the bottom as an option to sign via Omniauth.
