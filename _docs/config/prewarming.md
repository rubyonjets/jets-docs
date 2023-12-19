---
title: Jets Prewarming
nav_text: Prewarming
category: config
order: 2
---

Jets supports prewarming by periodically hitting the controller Lambda function with a noop prewarm request. This mitigates the Lambda cold-start issue and can be a more cost-effective way of avoiding the Lambda cold-start than using [Provisioned Concurrency]({% link _docs/config/concurrency.md %}). It's a smart or poor man's version of Provisioned Concurrency.

Only the Lambda Function that handles Controller requests are prewarmed. Prewarming is enabled by default. To adjust the prewarming settings:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.prewarm.enable = true # default: enabled
 config.prewarm.rate = "30m" # default: 30 minutes
 # config.prewarm.cron = "0 */12 * * ? *" # when configured takes higher precedence than prewarm.rate
 # config.prewarm.threads = 1 # default: 1
end
```

## Rate vs Threads

Concurrency can be helpful if requests are coming in at the same time in parallel. Example: The Lambda function gets 60 requests/minute, and each request takes 1 second to process.

* **Case 1**: All 60 requests come in simultaneously within the first second. The desired concurrency should be 60; otherwise, 59 of 60 requests will be hit with a cold start (in the worst-case scenario).
* **Case 2**: The 60 requests come in serially each second for a minute. In theory, the same Lambda "container" can serve all the requests without a cold start.

The same applies to traditional servers like Puma where you need more Puma threads and processes to handle increased concurrency. With servers, depending on the web server settings, requests can be queued and eventually returned with slow response times. With Lambda, you get a `429 Too Many Requests Error` Status Code. In either case, the user probably gave up on the webpage and left.

Option | Explanation
--- | ---
rate | Controls how often the prewarming job runs.
threads | Controls how many Ruby threads to call the Prewarm event in parallel.

For example, with a rate of 2 hours and threads of 2, the Lambda functions are called with a prewarm request 48 times after 24 hours (24 hours x 2).

## Threads < Reserved Concurrency

Theoretically, `config.prewarm.threads` should be less than `config.lambda.controller.reserved_concurrency` [Reserved Concurrency]({% link _docs/config/concurrency.md %}), otherwise the prewarm request could create `429 Too Many Requests` errors. In practice, I've found that since the prewarm request is a noop operation that's so fast, it does not cause throttling. It's likely because the AWS Lambda scaling algorithm buffers a bit before deciding to scale. It's probably safest to keep `config.prewarm.threads <= config.lambda.controller.reserved_concurrency` since other requests in your app can take some time and keep the Lambda busy. It's also more cost-effective.

## Prewarm After Deployment

After a deployment finishes, Jets automatically prewarms the app immediately. This keeps your application nice and fast.

## Prewarm Custom Headers

Jets appends an `x-jets-prewarm-*` headers to the response to help you see if the lambda function was prewarmed. The headers looks something like this:

 x-jets-boot-at: 2024-04-17 18:08:45 UTC
 x-jets-prewarm-at: 2024-04-17 18:31:22 UTC
 x-jets-prewarm-count: 22
 x-jets-gid: cb205b47

Here's a curl command that is useful to see this info:

 curl -svo /dev/null <REPLACE_URL> 2>&1 | grep 'x-jets'

We can see that the Lambda function had been prewarmed, and the boot-at header shows the last time AWS Lambda recycled the Lambda function.

## Cost Analysis

Here's some basic cost analysis of using Jets prewarm feature vs [Provisioned Concurrency]({% link _docs/config/concurrency.md %}). For these numbers, I'm tweaking the calculations by adding an extra 1M request to remove the free tier, but I am removing the 1M from the numbers below. The goal here is to get an idea of ballpark costs.

We'll use the helpful [AWS Lambda Calculator](https://calculator.aws/#/createCalculator/Lambda) with baseline assumptions: Using ARM architecture, a 1.5GB Lambda Function with Average Duration 150ms.

If we prewarm at different rates per minute and number of threads

Rate and Threads | Requests/Mo | Cost/Mo
---|---|---
1 request/min with threads 1 | 43,800 | $0.01/mo
1 request/min with threads 10 | 438,000 | $0.09/mo
1 request/min with threads 30 | 1,314,000 | $1.71/mo
10 requests/min with threads 30 | 10,314,000 | $29.03/mo
1 request/5min with threads 10 | 87,600 | $0.02/mo

With Provisioned Concurrency, we'll have a constant number of running threads. Remember, they are **always** on Lambdas. Here's the baseline cost with no requests.

Provisioned Concurrency | Cost/Mo
---|---|---
1 | $12.66/mo
30 | $379.70/mo

As you can see, having **always** running Lambdas costs you a lot more upfront.

The devil is in the details, as Provisioned Concurrency requests cost less than on-demand on a per-request basis. If you have a ton of requests, you eventually break even. For small and medium sites, on-demand Lambdas are more cost-effective. Please experiment with the calculator yourself to see the numbers. Good math students double-check their numbers.

**Note**: AWS updates their pricing periodically, so always check the numbers yourself. These calculations will likely be out-of-date.

{% include config/reference/header.md %}
{% include config/reference/prewarm.md %}
{% include config/reference/footer.md %}
