---
title: Serverless AWS Lambda Costs
nav_text: Costs
category: considerations
---

AWS Lambda Serverless has the capability to scale almost without limits. Ironically, your main concern is not whether your app can scale up, but rather how to limit its scaling. It shifts your thinking about scalability.

Since the AWS Lambda model charges based on requests and can scale nearly limitlessly, you can end up with a huge bill. Even if you're careful, you can be unlucky and get hit by a DDOS attack. Thankfully, there are several strategies available to help manage and mitigate these risks.

## Reserved Concurrency

A useful Lambda Function setting is Reserved Concurrency.

{% include config/reserved-vs-provisioned-concurrency.md %}

Hence, a way to mitigate costs and limit AWS Lambda scaling is by configuring Reserved Concurrency.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.controller.reserved_concurrency = 2
end
```

The Jets default is `lambda.controller.reserved_concurrency = 25`, which provides a safeguard.

If you encounter a DDOS attack, Lambda will return 429 TooManyRequestsException errors. Similarly, traditional EC2 servers will return 500 errors. In both cases, you will still incur costs for requests and bandwidth.

Short of removing your site from the face of the planet by removing its DNS record, there you still get ding with some costs. However, the costs are mitigated since error responses are light and fast. It costs you a lot less bandwidth and duration to serve the requests. Remember, it costs DDOS attackers money also.

More Docs: [Config Concurrency]({% link _docs/config/concurrency.md %})

## WAF Protection

Another way mitigate AWS Lambda Costs from DDOS attacks is to use an [AWS WAF](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-awswaf.html), a Web Application Firewall.

{% include config/cloudfront/waf-example.md %}

{% include config/cloudfront/waf-command.md %}

For more docs, see: [Lambda URL CloudFront WAF]({% link _docs/waf.md %})
