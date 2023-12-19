This allows you to deploy additional stacks or environments wihthout any configuration changes. Examples:

    JETS_EXTRA=beta jets deploy
    cloudfront.route53.name => "demo-dev-beta.example.com"
    JETS_EXTRA=2 jets deploy
    cloudfront.route53.name => "demo-dev-2.example.com"
    JETS_ENV=prod jets deploy
    cloudfront.route53.name => "demo-dev-prod.example.com"
