alb.ssl.certs | / | The ACM certificates to use. Example: ["arn:aws:acm:us-west-2:11111111:certificate/EXAMPLE"]. If only using one cert, can also just provide a String instead of an Array. Remember to also set `ssl.enable = true`
alb.ssl.enable | false | Whether or not to enable the creationg of an SSL Listener. If enabled, `ssl.certs` should be set.
alb.ssl.port | 443 | ALB SSL Listener port