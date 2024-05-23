---
title: CodeBuild Fleet
nav_text: Fleet
category: remote-codebuild
order: 4
---

You can use Reserved Capacity CodeBuild Fleet if you want faster build times. These are **always** running EC2 instances to run the builds.

## How to Enable

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.fleet.enable = true
end
```

The configuration creates a Jets Managed Reserved Fleet of 1 instance to run builds. The codebuild project is automatically configured by Jets to use the CloudBuild Fleet ARN.

**Important:** The first build takes a few extra minutes because it takes time to launch the EC2 instance initially. Expect the first queue time to be a few minutes longer.

## Using Existing Fleet

If you already have an existing CodeBuild fleet that you want to use, you can configure it like so:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.fleet_override = "ARN"
end
```

The existing fleet override will take precedence over a Jets Managed Reserved Fleet. As such, you should only use one or the other.

## Pros and Cons

**Pros:**

The significant benefit of a reserved fleet is caching. Jets configures the CodeBuild Project for Docker Image caching. Cached Docker layers can take your gem dependency build times to zero for most deploys, shaving minutes off the deployment times.

Note, even if you do not use Reserved fleets, Jets turns Docker Image caching is turned on, but it's a best-effort cache hit. Usually, if your builds do not run within minutes of each other, you'll be given another throwaway container that won't have your Docker layers cached.

**Cons:**

They are not thrown away after each run; they are always running. Hence they have additional costs. The lowest cost Reserved fleet you can get is:

* A `reserved.arm.g1.small` costs $0.00204/minute =~ $88/mo.
* You are charged a **minimum** of an hour once you create a reserved fleet. IE: $0.1224. After the first hour, you are billed minutely.
* Prices may change. It's noted so you have an idea of cost. However, you should always refer to AWS for authorative pricing.
* Other instance types cost more money. See [CodeBuild Pricing](https://aws.amazon.com/codebuild/pricing/).
* If you are only running one instance in the fleet, other jobs will be stuck in the queue waiting.

{% include reference/config/header.md %}
{% include reference/config/deploy/codebuild/fleet.md %}
{% include reference/config/footer.md %}
