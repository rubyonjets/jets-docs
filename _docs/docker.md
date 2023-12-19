---
title: Docker Support
nav_text: Docker
category: top-level
subcategory: docker
order: 4
---

Jets supports deploying your app as a Docker image. Jets automates the process and handles the heavy lifting.

## Advantages

* Use any Ruby version you want. You're not limited to the AWS Lambda official Ruby runtimes.
* Increase app size allowance. Up to **10GB** images vs the zip 250MB limit.
* A portable and more standard deployment format.

## Disadvantages

* Cold starts are longer. They can add seconds.
* You cannot use the Lambda Console editor. Note, you can't use editor with the zip format either if the package is larger than 3GB.
* You need some Docker knowledge.

## Docker Image Format Config

The default package type is image and already enabled. Here's an example config though.

```ruby
Jets.deploy.configure do
  config.package_type = "image" # default
end
```

One of the reasons for the default is that CloudFormation Lambda Functions not able do an "in-place" update of the format. IE: You cannot switch between "image" and "zip". You have to delete the stack and recreate it. To be on the safer side, Jets defaults to the image format. So you won't run into zip format limitations have to delete and recreate your app in the future.
