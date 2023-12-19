alb.route53.domain | nil | This is the recommended option to set. The `alb.route53.hosted_zone_name` and `alb.route53.name` options conventionally uses this. This setting alone is enough for Jets to add the Route53 DNS record.
alb.route53.hosted_zone_id | nil | The hosted zone id. Takes precedence over `alb.route53.hosted_zone_name`. This is useful for split-horizon DNS.
alb.route53.hosted_zone_name | nil | The hosted zone name. Setting `alb.route53.domain` is preferred over `alb.route53.hosted_zone_name` since it's easier to read and debug.
alb.route53.name | nil | The domain name. IE: my.domain.com. However, setting `alb.route53.domain` is preferred over `alb.route53.name`, so the name can conventionally set to something like `demo-dev.domain.com`. You then manually CNAME your pretty domain to it. IE: `www.domain.com` -> `demo-dev.domain.com`. This gives you more control over the user-friendly DNS.
alb.route53.ttl | 60 | DNS TTL
alb.route53.type | CNAME | DNS Type