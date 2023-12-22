---
title: Redirection Support
nav_text: Redirection
category: routing-services-alb
order: 5
---

If you have set up [SSL]({% link _docs/routing/services/alb/ssl.md %}), then Jets will set up an HTTP to HTTPS redirect by default. You can configure the behavior if you need to.

You can configure redirection by configuring the ELB Listener. Here's an example that redirects http to https with a 302 status code:

config/deploy.rb

```ruby
Jets.application.configure do
  config.alb.redirect.enable = true
  # defaults
  # config.alb.redirect.code = 302  # IE: 302 or 301
  # config.alb.redirect.port = 443
  # config.alb.redirect.protocol = HTTPS

  # required to use the redirect above
  config.alb.ssl.enable = true
  config.alb.ssl.certs = acm_cert_arn("domain.com")
end
```

You should must set up [SSL Support]({% link _docs/routing/services/alb/ssl.md %}) if you're using this.

{% include config/reference/header.md %}
{% include config/reference/alb.md %}
{% include config/reference/footer.md %}
