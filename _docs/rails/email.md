---
title: Jets Rails Email Sending
nav_text: Email
category: rails
subcategory: email
order: 13
---

Rails supports sending emails via ActionMailer.

## Example

Here's an example showing how to get started with email.

    rails new demo
    cd demo
    rails generate mailer UserMailer new_user

This generates starter `app/mailers/application_mailer.rb` and `app/mailers/user_mailer.rb` examples.

## Sending Email

Here's an example of how to send email:

    $ rails console
    > UserMailer.new_user.deliver

If your ActionMailer class uses params you can provide them via the `with` method.  Example:

```ruby
class UserMailer < ApplicationMailer
  def notify_user
    @post = params[:post]
    mail(to: "to@example.org", subject: "Check out this post")
  end
end
```

Then in the console:

    $ rails console
    > posts = Posts.first
    > UserMailer.with(post: post).notify_user.deliver

## Asynchronous Sending

If you want ActionMailer to send emails asynchronously, you can use the `config.active_job.queue_adapter = :jets_job` adapter. See: [Enabling Jets Jobs]({% link _docs/jobs/enable.md %}).
