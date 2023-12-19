---
title: Concurrency
category: config
order: 2
---

You can configure Reserved and Provisioned Concurrency for Jets Lambda Functions.

## Controller Concurrency

To configure Concurrency for controller requests.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.controller.provisioned_concurrency = 1
  # config.lambda.controller.reserved_concurrency = 25
end
```

## Avoiding the Cold Starts

You can use Provisioned Concurrency to avoid cold starts. This is because Lambdas with Provisioned concurrency are always running. In a sense, they are like regular servers. However, there's a cost associated with Provisioned Concurrency. The cost depends on the Function size. The AWS Lambda Console provides a useful cost estimate under the Provisioned Concurrency setting.

![](https://img.boltops.com/tools/jets/config/provisioned-concurrency-estimate.png)

For example, a 1.5GB Lambda function has a baseline cost of $16.74/mo. In addition to that baseline, you are charged for provisioned requests. Provisioned requests offer a lower rate than on-demand requests. Depending on how frequently your Lambdas are requested, provisioned concurrency costs may be more or less than on-demand concurrency costs. For many, on-demand is the more cost-effective option.

Note: Even with Provisioned Concurrency, there is still a smaller cold start when new functions are deployed. The cold start is eliminated when AWS Lambda cycles the function.

Jets also has a [Prewarming]({% link _docs/config/prewarming.md %}) feature that will regularly ping your Jets Controller Lambda function to reduce the likelihood of a cold start. This can be a more cost-effective way to minimize the effect of cold starts.

## Reserved vs Provisioned Concurrency

{% include config/reserved-vs-provisioned-concurrency.md %}

Provisioned Concurrency does not affect limiting Lambda scaling. If more scaling is required, Lambda uses additional on-demand Lambdas.

Related

* [AWS Docs: Configuring provisioned Concurrency](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html)
* [AWS Docs: Understanding and visualizing Concurrency](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#understanding-concurrency)
* [AWS Blog: Set Concurrency Limits on Individual AWS Lambda Functions](https://aws.amazon.com/about-aws/whats-new/2017/11/set-concurrency-limits-on-individual-aws-lambda-functions/)


## Reserved Concurrency Defaults

The Jets Reserved Concurrency defaults are

```ruby
  config.lambda.function.reserved_concurrency = 10
  config.lambda.controller.reserved_concurrency = 25
```

The defaults provides a safeguard to mitigate [runaway costs]({% link _docs/more/considerations/costs.md %}) in the event of a DDOS. Since AWS Lambda can essentially scale limitlessly. Setting reserved concurrency limits scaling.

The controller limit is configured at 25 to handle scenarios where a page initiates multiple simultaneous Lambda requests, like in photo galleries. This limit of 25 matches the typical pagination settings found in libraries such as [Kaminari](https://github.com/kaminari/kaminari). This default avoids surpassing Lambda's reserved concurrency capacity, which could otherwise result in a 429 "Too Many Requests" error.

If your application doesn't generate parallel requests, you can likely reduce the `controller.reserved_concurrency` setting to a much lower value. A setting of `controller.reserved_concurrency = 5` is fine for most cases. It just depends on how your app works. AWS Lambda efficiently reuses functions after their initial cold start. It will only scale up if multiple requests arrive simultaneously in **parallel**.

## AWS Account-Level Lambda Concurrency Limit

It is important to know that AWS accounts usually have default account Reserved Concurrency of 1,000. Using Reserved Concurrency takes away from your overall AWS Account limit "pool". 100 is unreservable.

[AWS Docs: Concurrency quotas](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#concurrency-quotas)

> Lambda always reserves 100 units of concurrency for your functions that don't explicitly reserve concurrency.

Hence, the most you can reserve is 900 of 1,000. This means if you can have 36 app deployments with the Jets defaults (36 * 25 = 900). To help simplify the ballpark calculation and help explain, we're not including Jets Jobs or Events Functions Reserved Concurrency.

You can check your Lambda Concurrency Limit.

* With the [AWS Lambda Console](https://console.aws.amazon.com/lambda/home). This nice because it's readily available. It makes it easier to spot when you are nearing your account limit.
* The [Service Quotas Console](https://console.aws.amazon.com/servicequotas/home/services/lambda/quotas). You can request for an increase here. You can also open up an AWS support ticket to request an increase.
* Here are more ways from the AWS Docs to check: [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html)

![](https://img.boltops.com/tools/jets/config/aws-lambda-service-quota-concurrent-executions.png)

Here's also an AWS CLI command to check.

    ❯ aws lambda get-account-settings | jq
    {
      "AccountLimit": {
        "TotalCodeSize": 80530636800,
        "CodeSizeUnzipped": 262144000,
        "CodeSizeZipped": 52428800,
        "ConcurrentExecutions": 1000,
        "UnreservedConcurrentExecutions": 577
      },
      "AccountUsage": {
        "TotalCodeSize": 2576140188,
        "FunctionCount": 77
      }
    }

* Related: [Stack Overflow: Can I limit concurrent invocations of an AWS Lambda?](https://stackoverflow.com/questions/42028897/can-i-limit-concurrent-invocations-of-an-aws-lambda)

## Unlimited Reserved Concurrency

If you need to remove the limits, you can set both configs to `nil`.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.controller.reserved_concurrency = nil  # remove limit for controller requests
  config.lambda.function.reserved_concurrency = nil    # remove limit for functions and events
end
```

This removes the limit for both Controller requests and [Events]({% link _docs/events.md %}).

When no Reserved Concurrency is specified, the default AWS Lambda behavior is to scale up to the limit of the AWS account. AWS Accounts have a Concurrent execution limit of 1,000. Note that brand-new AWS accounts have reduced concurrency and memory quotas. See: [Lambda Quotas](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html).

This means that when `reserved_concurrency = nil`, AWS Lambda can scale up to 1,000 concurrent requests. This is a soft limit. You can request a limit increase with an AWS support ticket.

## Database Connections Limit

It is recommended to **not** configure unlimited Reserved Concurrency and rely on your AWS account limit. Your app will likely hit another bottleneck, a common one being the database connection limit.

With traditional EC2 servers, you would normally configure the web server, IE: puma threads, to be less than the available database connections. Otherwise, you would run out of DB connections. Similarly, with AWS Lambda, you should limit the Reserved Concurrency to the number of available DB connections. Otherwise, Lambda will scale beyond the number of available DB connections and cause errors.

## Monitoring Concurrency

It is important to monitor **Thottles** and **Total concurrent executions**.  You can see these metrics in the Lambda Console Monitor tab.  If throttling is occurring, users will see this error:

> 429 Too Many Requests

This means the default Reserved Concurrency is too low for your app. You want the metrics to be:

* **Thottles** to always be **0**.
* **Total concurrent executions** to always be less than the `reserved_concurrency` config.

If your app is hitting the limit, you can increase Reserved Concurrency to resolve the issue. You can also try to speed up your app. If your app logic is faster, AWS Lambda can reuse the same Lambda to serve requests instead of provisioning new concurrent ones. You might also be able to change the way your app works to make fewer requests in parallel. For example, if you have a photo page with 1,000 images and no pagination, then the page triggers all 1,000 images to load simultaneously. The photos could be paginated or lazy loaded.

**Important**: The "429 Too Many Requests" error will **not** show up in your AWS Lambda Function Logs. This is because AWS Lambda throttles and cuts off the request before it reaches your Lambda function. That's the point of throttling.

## Reserved > Provisioned Concurrency

An important note from the [AWS Provisioned concurrency Docs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#provisioned-concurrency-concept)

> If the amount of provisioned Concurrency on a function's versions and aliases adds up to the function's reserved Concurrency, then all invocations run on provisioned Concurrency. This configuration also has the effect of throttling the unpublished version of the function ($LATEST), which prevents it from executing. You can't allocate more provisioned Concurrency than reserved Concurrency for a function.

This means you should **never** configure reserved_concurrency to be equal or less than provisioned_concurrency, otherwise you'll get a Rate Exceeded `ReservedFunctionConcurrentInvocationLimitExceeded` error.

## Events Concurrency

You can also configure Concurrency for Lambda Functions from [Jets Events]({% link _docs/events.md %}). There are multiple ways to configure it. You can configure it app-wide with a config.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.reserved_concurrency = 2
  # config.lambda.function.provisioned_concurrency = 1
end
```

You can also configure it on a per-method basis in the code itself.

app/events/cool_event.rb

```ruby
class CoolEvent < ApplicationEvent
  reserved_concurrency 2
  # provisioned_concurrency = 1

  rate "10 hours"
  def handle
    puts "Do something with event #{JSON.dump(event)}"
  end
end
```

Note, you can also configure Provisioned Concurrency for events, but there's little point since Event handling is typically async. A cold-start is not the end of the world. Using only on-demand Concurrency is more cost-effective.

{% include config/reference/header.md %}
{% include config/reference/lambda/controller-concurrency.md %}
{% include config/reference/lambda/function-concurrency.md %}
{% include config/reference/footer.md %}
