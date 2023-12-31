This allows you to deploy additional stacks or environments wihthout any configuration changes. Examples:

    JETS_EXTRA=beta jets deploy
    cloudfront.dns.name => "demo-dev-beta.domain.com"
    JETS_EXTRA=2 jets deploy
    cloudfront.dns.name => "demo-dev-2.domain.com"
    JETS_ENV=production jets deploy
    cloudfront.dns.name => "demo-dev-prod.domain.com"
