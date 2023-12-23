{% include config/reference/alb/dns.md %}
alb.enable | false | Enables creating the ALB. Can be "auto", true or false. Auto means will create an ALB when role is `web`.
{% include config/reference/alb/existing.md %}
{% include config/reference/alb/listener.md %}
{% include config/reference/alb/load_balancer.md %}
{% include config/reference/alb/redirect.md %}
alb.redirect.status_code | 302 | Redirection status code
{% include config/reference/alb/security_group.md %}
{% include config/reference/alb/ssl.md %}
{% include config/reference/alb/target_group.md %}