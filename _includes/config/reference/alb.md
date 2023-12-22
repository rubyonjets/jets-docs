alb.default_actions | nil | Override the Listener default actions. This provides you a lot of control.
alb.enable | auto | Enables creating the ELB. Can be "auto", true or false. Auto means will create an ELB when role is `web`.
{% include config/reference/alb-existing.md %}
alb.health_check_interval_seconds | 10 | Time, in seconds, between health checks.
alb.health_check_path | / | Health check url path.
alb.healthy_threshold_count | 3 | Number of health checks successes before considered healthy.
alb.listener.enable | Whether or not to create the standard listener with default port 80 | true
alb.matcher | [Target group matcher](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-elasticloadbalancingv2-targetgroup-matcher.html) | nil
alb.port | 80 | ELB Listener port
alb.protocol_version | [Protocol version](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticloadbalancingv2-targetgroup.html#cfn-elasticloadbalancingv2-targetgroup-protocolversion) | nil
alb.redirect.code | 302 | Redirection status code
alb.redirect.enable | false | When set to true, the Listener redirect to HTTPS by default. You should also set up SSL.
alb.redirect.port | 443 | Redirection status port
alb.redirect.protocol | HTTPS | Redirection protocol
alb.ssl.certs | / | The ACM certificates to use. Example: ["arn:aws:acm:us-west-2:11111111:certificate/EXAMPLE"]. If only using one cert, can also just provide a String instead of an Array. Remember to also set `ssl.enable = true`
alb.ssl.enable | false | Whether or not to enable the creationg of an SSL Listener. If enabled, `ssl.certificate` should be set.
alb.ssl.port | 443 | ELB SSL Listener port
alb.unhealthy_threshold_count | 3 | Number of health check failures before considered unhealthy.