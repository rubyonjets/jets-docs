{{ include.config_path }}.cloudfront.cert.arn | nil | ACM Cert ARN. Required when using `{{ include.config_path }}.cloudfront.enable = true`.  Must be in `us-east-1` since it's for CloudFront. This helper method is useful: `acm_cert_arn(domain: "example.com", region: "us-east-1")`
{{ include.config_path }}.cloudfront.cert.minimum_protocol_version | TLSv1.2_2021 | The `TLSv1.2_2021` has been the Cloudfront console default as of 12/24/23.
{{ include.config_path }}.cloudfront.cert.ssl_support_method | sni-only | he distribution accepts HTTPS connections from only viewers that support server name indication (SNI). This is recommended. Most browsers and clients support SNI.
{{ include.config_path }}.cloudfront.default_cache_behavior.allow_methods | {% if include.config_path == "assets" %}%w[HEAD GET]{% else %}%w[HEAD DELETE POST GET OPTIONS PUT PATCH]{% endif %} | Allow methods for the distribution.
{{ include.config_path }}.cloudfront.default_cache_behavior.properties | {} | Default cache behavior properties to merge. Allows overriding the propertes in a general way.
{{ include.config_path }}.cloudfront.default_cache_behavior.viewer_protocol_policy | redirect-to-https | How CloudFront should handle http requests. The default is to redirect http to https. IE: A https upgrade.
{{ include.config_path }}.cloudfront.route53.comment | "Jets managed CloudFront distribution DNS record" | Route53 Record comment.
{{ include.config_path }}.cloudfront.route53.enable | false | Enables creation of the Route53 DNS Records that match the CloudFront aliases.
{{ include.config_path }}.cloudfront.route53.hosted_zone_id | nil | Route53 Hosted Zone ID. This takes higher precedence over hosted_zone_name.
{{ include.config_path }}.cloudfront.route53.hosted_zone_name | nil | Route53 Hosted Zone ID. Allows you to specify the config in a human-readable way. Note `route53.domain` also works as a convenience.
{{ include.config_path }}.cloudfront.route53.properties | {} | Route53 DNS record properties to merge. Allows overriding the propertes in a general way.
{{ include.config_path }}.cloudfront.route53.ttl | 60 | Route53 DNS TTL. This is only used when `{{ include.config_path }}.cloudfront.route53.use_alias = false` and a CNAME is created instead.
{{ include.config_path }}.cloudfront.route53.use_alias | true | Use an A Record with the "Alias" Route53 feature. This allows APEX domains to work with CloudFront distributions.
{{ include.config_path }}.cloudfront.enable | false | Enables CloudFront Distribution in front of the Lambda URL. See: [Lambda URL CloudFront Distribution]({{ link _docs/routing/lambda/cloudfront/distribution.md }})
{{ include.config_path }}.cloudfront.http_version | http2 | HTTP version that you want viewers to use to communicate with CloudFront.
{{ include.config_path }}.cloudfront.ipv6_enabled | true | Enables IPV6 also for CloudFront.
{{ include.config_path }}.cloudfront.origin.custom_origin_config | { HTTPSPort: 443, OriginProtocolPolicy: "https-only" } | Custom origin config.
{{ include.config_path }}.cloudfront.origin.properties | {} | Origin properties to merge. Allows overriding the propertes in a general way.
{{ include.config_path }}.cloudfront.origin.viewer_protocol_policy | redirect-to-https | How CloudFront should handle http requests. The default is to redirect http to https. IE: A https upgrade.
{{ include.config_path }}.cloudfront.price_class | PriceClass_100 | Price class you want to pay for CloudFront. There's PriceClass_100, PriceClass_200, PriceClass_All.  Note, since the lower price classes use less regions, they deploy faster.
{{ include.config_path }}.cloudfront.properties | {} | Properties to merge and override [CloudFront Distribution](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html)
{% if include.config_path == "assets" -%}
{{ include.config_path }}.cloudfront.spread_hosts | true | Whether or not to create multiple aliases with pattern `assets%d.example.com` to spread the requests. Related: [Rails Assets](https://api.rubyonrails.org/classes/ActionView/Helpers/AssetUrlHelper.html)
{% endif -%}
{{ include.config_path }}.enable | true | Enables Lambda Function URL for the Controller Lambda Function.