waf.block_ips.enable | false | Enable blocking of IP addresses.
waf.block_ips.list | [] | List of IP addresses to block.
waf.default_rules | see desc | The default rules curated AWS managed rules and Jets Blanket Rate Limiter rule. See: [WAF Default Rules]({% link _docs/waf/default-rules.md %})
waf.logging.enable | false | Turn on WAF logging to CloudWatch. Useful to determine whether or not WAF is blocking a request.
waf.custom_rules.blanket_rate_limiter.action | Block | Action to take when rate limit is reached.
waf.custom_rules.blanket_rate_limiter.aggregate_key_type | IP | Type of IP address to use. Can be `IP` or `FORWARDED_IP`. See: [WAF Rule Rate Based Statement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-wafv2-webacl-ratebasedstatement.html#cfn-wafv2-webacl-ratebasedstatement-aggregatekeytype)
waf.custom_rules.blanket_rate_limiter.enable | true | Enable blanker rate limiter. Fundamental defense against DDOS.
waf.custom_rules.blanket_rate_limiter.evaluation_window_sec | 300 | How far back in seconds the WAF should look when it checks how many times the IP address sent a request.
waf.custom_rules.blanket_rate_limiter.limit | 1000 | Number of requests by the **same** IP before being rate limited.
waf.custom_rules.uri_rate_limiter.action | Block | Action to take when rate limit is reached.
waf.custom_rules.uri_rate_limiter.aggregate_key_type | IP | Type of IP address to use. Can be `IP` or `FORWARDED_IP`. See: [WAF Rule Rate Based Statement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-wafv2-webacl-ratebasedstatement.html#cfn-wafv2-webacl-ratebasedstatement-aggregatekeytype)
waf.custom_rules.uri_rate_limiter.enable | false | Enable url rate limiter. Can be useful to restrict specific URLs to a lower rate limit. IE: `/login`
waf.custom_rules.uri_rate_limiter.evaluation_window_sec | 300 | How far back in seconds the WAF should look when it checks how many times the IP address sent a request.
waf.custom_rules.uri_rate_limiter.limit | 100 | Number of requests by the **same** IP before being rate limited.
waf.custom_rules.uri_rate_limiter.logical_statement | "Or" | Logical statement to join the paths logical together.
waf.custom_rules.uri_rate_limiter.paths | ["/"] | The paths to apply the rate limit rule. IE: `["/logins", "/signgup"]`
waf.custom_rules.uri_rate_limiter.string_match_condition | "STARTS_WITH" | Match condition expression. Examples: `CONTAINS EXACTLY STARTS_WITH`. See: [CloudFormation PositionalConstraint Docs](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-wafv2-webacl-bytematchstatement.html) for more
waf.monitoring | false | When true, adjust rules to use Count action to all rules. This is "Monitoring" mode.
waf.name | Jets.env | Name of the waf. Defaults to Jets.env. IE: `dev` or `prod`
waf.properties | {} | Properties to override [WebACL](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-wafv2-webacl.html)
waf.rules | [] | Additional Custom User WAF rules to add.