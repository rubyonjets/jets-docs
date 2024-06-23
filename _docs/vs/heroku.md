---
title: "Jets vs Heroku"
nav_text: Heroku
category: vs
order: 1
---

Jets and Heroku both provide a way to deploy your app.

Heroku is known for its ease of use and comes with the `Heroku` cli to manage your apps and deployments. The `jets` cli is inspired by the heroku cli and also allows you to manage your projects and deployments with the same level of ease.

## How It Works

One of the most significant differences between Heroku and Jets is the way your app is deployed. Heroku deploys your app to their servers on their AWS account. Heroku runs a huge fleet of servers deploys your app to this cluster. Heroku provides tooling on top of that.

Whereas, Jets deploys directly to your own AWS account. Jets does not create a fleet of servers. Instead, Jets deploys your app to the vast AWS fleet of "Serverless" servers like Lambda and ECS Fargate.

The key difference of where your app deploys to makes can make some things easier to handle. For example, Heroku's "Private Networking" implementation is essentially AWS VPC Peering. VPC Peering virtually combines 2 different VPCs to make them look like a single VPC. Heroku Private Spaces have a starting baseline of $1,200/mo. With Jets, you don't need VPC peering at all. You deploy your app directly to your VPC.

## Price

Pricing is a huge difference. Heroku charges a premium for its software tooling. Heroku charges for "dynos". A dyno can thought of as a container. Most real-world apps are RAM bottlenecked. With Rails, you'll typically need around 1.5GB to 2.5GB of RAM. A heroku dyno with 2.5GB is $250/mo. It's like 1 docker container!

If you have an app with some real-world usage, you'll should have multiple containers for redundancy. Let's say you use 4 dynos, that's $1,000/mo. As you can see, as you scale up, it becomes expensive very quickly.

The Jets pricing model very different. Jets also charges a premium for its software tooling. However, this is where it gets interesting. Jets charges a flat fee for each stack; for simplicity, it's $20/stack. You still pay for the AWS resources like AWS Lambda Function invocations, but you pay that directly to AWS. There's no additional premium on the Jets side as you scale up. This can make costs very favorable. If you fit in the AWS free tier at 1 million monthly free requests, you don't pay more.

RAM   | Heroku  | Jets   | Savings
------|---------|--------|---------
512MB | $25/mo	| $20/mo | 20%
1GB   | $50/mo	| $20/mo | 60%
2.5GB | $250/mo	| $20/mo | 92%
14GB	| $500/mo	| $20/mo | 98%

It's important to note that Lambda will cost more at higher throughputs though. Using ballpark figures with 1.5GB Lambda function and at average duration 300ms here’s what cost could look like at 10m requests/mo ~ $58/mo.

The beauty with Jets is that you can switch to ECS fargate at higher levels of throughput. Fargate at that point makes more sense. This more [general pricing comparision blog post](https://blog.boltops.com/2018/04/22/heroku-vs-ecs-fargate-vs-ec2-on-demand-vs-ec2-spot-pricing-comparison/) is also relevant.

## Reliability and Performance

The reliability and performance on both platforms are comparable.

Heroku deploys always running dynos. There is no cold-start. But you get charge for the always running Dynos.

Since Jets can deploy to AWS Lambda, there is a the cold-start penality The lambda cold-start with a Rails bootup can take about 10 seconds and is definitely a thing. It reminds me of DHH talking about the Russian doll caching technique. In practice, one out of thousands of requests may hit it. If you're building NASA spaceships, then it may matter. For most web apps, it doesn't matter. As usual, it depends on your app.

You can also pay more for provisioned concurrency to have "always running lambdas" That gets rid of the cold-start entirely when lambda recycles the function containers every few hours. That costs around $17/mo for the provisioned concurrency.

I've found Jets prewarming to be more cost-efficient and work well. The live apps above do not use provisioned concurrency. They only use Jets prewarming.

At the end of the day, performance ultimately depend on your application, but in terms of platform, it's just compute power.

## Ease of Use

Heroku is well known for its ease and convenience. It’s great for beginners. Usually, folks start with Heroku and then eventually graduate to using their own AWS account.

Jets tooling is somewhat inspired by Heroku and also convenient and easy to use.

Where the Jets tooling shines though is that it offers more flexibility and control. This makes sense because Jets deploys directly to your AWS account. Your see more of what happens underneath the hood and can customize and control more of it. For example, you can use your existing VPC.  Route 53, CloudFront, and Assets Serving are also built-in and can be optionally used.

## Summary

We covered the differences between Jets and Heroku.

* **How They Works**: Heroku deploys to their AWS account. Jets deploys to your AWS account.
* **Price**: Jets hands down is much more affordable.
* **Performance**: In the real-world, it’s the same.
* **Use of Use**: Heroku is super user friendly but provides less control. Jets is almost as user-friendly and provides much more control.
