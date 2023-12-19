---
title: "Architecture: x86_64 vs arm64"
nav_text: Arch
category: config
order: 9
---

By default, Jets deploys Lambda functions that use the arm64 architecture. This is because it's cheaper and faster. It can up to a whopping 40%.

If you need to use the x86_64 architecture instead, this page shows you how.

## Configure

You just need to configure the CodeBuild remote runner to use the x86_64 architecture.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.environment = {
    ComputeType: "BUILD_GENERAL1_MEDIUM",
    Image: "aws/codebuild/amazonlinux2-x86_64-standard:5.0",
    Type: "LINUX_CONTAINER",
  }
end
```

That's enough because Jets detects the host machine architecture and configures Lambda functions, builds gem, and Dockefile, etc appropriately.

{% include docker/arch.md %}

## Switching Architecture

Interestingly, you can switch between x86_64 and arm64 architecture and do an in-place deploy, IE: A blue-green deploy is not required. Only changing the Lambda Function [Package Type]({% link _docs/config/package-type.md %}) requires a blue-green deployment.

## CodeBuild and Docker Host Arch Must Match

The CodeBuild Remote Runner and Docker Host architectures must match. Otherwise, the deployment when using the Zip Package Type will not work. Jets creates the final zip artifact on the CodeBuild Remote Runner. Hence, both need to match.

This only applies if you provide your own custom Docker Host, which helps speed up the deployment.

## Local Machine Architecture

Your local machine architecture, in general, will not matter to the final deployment architecture. This is because Jets deploys mainly with the [CodeBuild Remote Runner]({% link _docs/remote.md %}), which controls the architecture.

## Articles

* [EC2 A1 Instance with AWS Graviton Processor: Easy Way to Save 40%](https://blog.boltops.com/2018/12/16/ec2-a1-instance-with-aws-homegrown-arm-processor-easy-way-to-save-40/)
* [Amazon's Arm-based Graviton2 Against AMD and Intel: Comparing Cloud Compute](https://www.anandtech.com/show/15578/cloud-clash-amazon-graviton2-arm-against-intel-and-amd/9)
* [Faster and Cheaper: ARM Graviton vs Intel and AMD x86 AWS EC2](https://www.bolddata.org/blog/faster-and-cheaper-arm-graviton-vs-intel-and-amd-x86-aws-ec2)
