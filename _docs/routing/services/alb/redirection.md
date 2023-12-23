---
title: Redirection Support
nav_text: Redirection
category: routing-services-alb
order: 5
---

If you have set up [SSL]({% link _docs/routing/services/alb/ssl.md %}), then Jets will set up an HTTP to HTTPS redirect by default. You can configure the behavior if needed.

You can configure redirection by configuring the ELB Listener. Here's an example that redirects http to https with a 302 status code:

config/deploy.rb

```ruby
Jets.application.configure do
  # config.alb.redirect.status_code = 302  # IE: 302 or 301
  # config.alb.redirect.port = 443
  # config.alb.redirect.protocol = HTTPS

  # required to use the redirect above
  config.alb.ssl.enable = true
  config.alb.ssl.certs = acm_cert_arn("domain.com")
end
```

You must set up [SSL Support]({% link _docs/routing/services/alb/ssl.md %}) for the redirection feature.

{% include config/reference/header.md %}
{% include config/reference/alb/redirect.md %}
{% include config/reference/alb/footer.md %}
