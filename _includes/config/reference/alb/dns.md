alb.dns.domain | nil | This is the recommended option to set. The `alb.dns.hosted_zone_name` and `alb.dns.name` options conventionally uses this. This setting alone is enough for Jets to add the Route53 DNS record.
alb.dns.hosted_zone_id | nil | The hosted zone id. Takes precedence over `alb.dns.hosted_zone_name`. This is useful for split-horizon DNS.
alb.dns.hosted_zone_name | nil | The hosted zone name. Setting `alb.dns.domain` is preferred over `alb.dns.hosted_zone_name`.
alb.dns.name | nil | The domain name. IE: my.domain.com. However, setting `alb.dns.domain` is preferred over `alb.dns.name`, so the name can conventionally set to something like `demo-dev.domain.com`. You then manually CNAME your pretty domain to it. IE: `www.domain.com` -> `demo-dev.domain.com`. This gives you more control over the user-friendly DNS.
alb.dns.ttl | 60 | DNS TTL
alb.dns.type | CNAME | DNS Type