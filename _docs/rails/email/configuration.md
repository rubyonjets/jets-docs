---
title: Email Configuration SMTP
nav_text: Configure STMP
category: email
order: 1
---


config/environments/production.rb

```ruby
Rails.application.configure do
  config.action_mailer.show_previews = false # default: false
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address:         ENV['SMTP_ADDRESS'],
    port:            587,
    domain:          ENV['SMTP_DOMAIN'],
    authentication:  :login,
    user_name:       ENV['SMTP_USERNAME'],
    password:        ENV['SMTP_PASSWORD'],
    enable_starttls_auto: true
  }
end
```

We can configure the variables with [env files]({% link _docs/env/files.md %}).  Example:

.env.production:

```sh
RAILS_ENV=production
SMTP_ADDRESS=SSM  # /dev/demo/SMTP_ADDRESS  => email-smtp.us-west-2.amazonaws.com
SMTP_DOMAIN=SSM   # /dev/demo/SMTP_DOMAIN   => mydomain.com
SMTP_USERNAME=SSM # /dev/demo/SMTP_USERNAME => ABCASD5MXAIYXEXAMPLE
SMTP_PASSWORD=SSM # /dev/demo/SMTP_PASSWORD => ABCunGBKLUdbPdAH/FSxAi8eId99EyAOJz+mxEXAMPLE
```

{% include rails/email/ssm-env-note.md %}

## Testing SMTP

One way to test SMTP server connection is with telnet. Example:

    $ telnet email-smtp.us-west-2.amazonaws.com 587
    Connected to email-smtp.us-west-2.amazonaws.com.
    Escape character is '^]'.
    telnet> quit
    $

Note, to escape out of the telnet session you have to use the escape sequence `^]`.  That's the control key plus close square bracket key.  Then you can type `quit`.

## AWS SES Verified Identities

If your using AWS SES and your SES account is in sandbox mode. Make sure the from email is [Verified](https://docs.aws.amazon.com/ses/latest/dg/verify-addresses-and-domains.html)
