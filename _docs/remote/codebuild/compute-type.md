---
title: CodeBuild Remote Compute Type
nav_text: Compute Type
category: remote-codebuild
order: 2
---

You can use different CodeBuild Remote Runners with different CPU, memory, and operating system by changing their compute type.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.compute_type = {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/code build/amazonlinux2-aarch64-standard:3.0",
    Type: "ARM_CONTAINER",
  }
end
```

**Note**: Ultimately, the `project.compute_type` set the [CodeBuild Project Environment](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-codebuild-project-environment.html). However, you should use `project.compute_type` instead of `project.environment`. This will help if you enable the [Lambda Compute Type](#lambda-compute-type) also. The CodeBuild compute types for EC2 vs Lambda are required to be different.

## Remote Runner Host OS

The Remote Runner host OS is important because it determines the Docker image architecture. Jets does not build Docker images for multiple architectures because:

* It's much faster to build for only one specific architecture.
* Emulation of different architectures can be 95% slower.
* AWS Lambda only needs one image.

Jets produces a Docker image with the specific required architecture for the Lambda function.

## CodeBuild Compute Types

AWS CodeBuild supports two compute types:

* [EC2 Compute images](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html#ec2-compute-images)
* [Lambda Compute images](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html#lambda-compute-images)

## EC2 Compute Type

You should only configure the CodeBuild Remote Runner to use **EC2 compute images**. This is because they support Docker and installing system packages. By default, Jets uses an ARM image with a `ComputeType=BUILD_GENERAL1_SMALL`. You can change the Compute Type with:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.compute_type = {
    ComputeType: "BUILD_GENERAL1_LARGE",
    Image: "aws/codebuild/amazonlinux2-aarch64-standard:3.0",
    Type: "ARM_CONTAINER"
  }
end
```

For a list of compute types, see: [Compute Types](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-compute-types.html)

Jets will automatically use the correct Lambda Function architecture based on the CodeBuild Remote Runner host OS.

{% include docker/arch.md %}

If you want to use an x86_64 image instead, see: [Config Architecture]({% link _docs/config/arch.md %}).

## Lambda Compute Type

Using a Lambda compute image would be nice because they are billed by the second instead of the minute and are provisioned almost instantly. However, they do not support installing custom packages like `apt install libmysqlclient-dev` or Docker. They are too limited to handle deployment. Hence, Jets does not use the Lambda Compute type when deploying your app.

Jets will generally use the EC2 Compute type for commands that require packaging up and deploying your code. However, some Jets commands can use the Lambda Compute Type.

Here are some examples:

    jets build --templates
    jets ci:build
    jets ci:deploy
    jets ci:start
    jets waf:deploy

These Jets commands do not build or deploy your app and can benefit from using Lambda Compute Type.

## Enable Lambda Compute Type

To enable the CodeBuild Remote Runner with a Lambda Compute Type.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.lambda.enable = true
end
```

This creates an **additional** CodeBuild project with the suffix `remote-lambda`, IE: `demo-dev-remote-lambda`. This CodeBuild remote lambda runner will be used for commands that can use the Lambda Compute Type. Often, the build times are 30 seconds vs. over 1m.

## Default Compute Types

If you want to change the compute types that Jets uses:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  # ec2 compute type
  config.codebuild.compute_type = {
    ComputeType: "BUILD_LAMBDA_1GB",
    Image: "aws/codebuild/amazonlinux-aarch64-lambda-standard:ruby3.2",
    Type: "ARM_LAMBDA_CONTAINER"
  }
  # lambda compute type
  config.codebuild.lambda.compute_type = {
    ComputeType: "BUILD_GENERAL1_SMALL",
    Image: "aws/codebuild/amazonlinux2-aarch64-standard:3.0",
    Type: "ARM_CONTAINER"
  }
end
```

## CodeBuild Available Images

Keeping the default CodeBuild images up-to-date is essential. This is because AWS Codebuild is built on ECS. AWS runs a large multi-tenant ECS cluster for the Codebuild runners. AWS only caches the latest CodeBuild image. So, if the images are not up-to-date, the provisioning time is slower. From the [AWS Docs](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html)

> If you want to benefit from caching and minimize the provisioning duration of your build, select Always use the latest image for this runtime version in the Image version section of the CodeBuild console instead of a more granular version, such as aws/codebuild/amazonlinux2-x86_64-standard:4.0-1.0.0.

The Jets remote runners maintain and update the CodeBuild images as they are released. Remember, you can always also override the defaults with `config/jets/bootstrap.rb` if you wish.

CLI commands also help you find the available CodeBuild compute images.

    aws codebuild list-curated-environment-images | jq '.platforms[].languages[].images[].name' | grep aarch
    aws codebuild list-curated-environment-images | jq '.platforms[].languages[].images[].name' | grep x86_64

Related:

* [CodeBuild provisioning very slow most times](https://www.reddit.com/r/aws/comments/fjvvb8/codebuild_provisioning_very_slow_most_times/)
* [Docker images provided by CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html)
