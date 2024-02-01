---
title: Docker Support
nav_text: Docker
category: top-level
subcategory: docker
order: 7
---

Jets supports deploying your app as a Docker image. Jets automates the process and handles the heavy lifting.

## Advantages

* Use any Ruby version you want. You're not limited to the AWS Lambda official Ruby runtimes.
* Increase app size allowance. Up to **10GB** images vs the zip 250MB limit.
* A portable and more standard deployment format.

## Disadvantages

* Cold starts are longer. They can add seconds.
* You cannot use the Lambda Console editor. Note, you can't use editor with the zip format either if the package is larger than 3GB.
* You need a little more knowledge on Docker.

## Enable Docker

To enable docker.

```ruby
Jets.deploy.configure do
  config.docker.enable = true
end
```
