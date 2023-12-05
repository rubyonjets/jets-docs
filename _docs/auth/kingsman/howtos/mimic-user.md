---
title: "Kingsman How To: Sign in as another user if you are an admin"
nav_text: Mimic User
category: kingsman-howtos
order: 6
---

The ability to mimic or sign in as another user is a useful administration feature. Here's how you can can quickly "become" one of the users to see what their profile and screens look like.


```ruby
class Admin::UsersController < AdminController
  def become
    return unless current_user.admin?
    user_params = params.require(:user).permit(:id)
    mimic_user = User.find(user_params[:id])
    bypass_sign_in(mimic_user, scope: :user)
    redirect_to root_url
  end
end
```

Note: This is based on [Devise How To: Sign in as another user if you are an admin
](https://github.com/heartcombo/devise/wiki/How-To:-Sign-in-as-another-user-if-you-are-an-admin)
