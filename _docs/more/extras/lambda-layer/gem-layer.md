---
title: Gem Layer
category: extras
order: 10
---

Jets bundles your project's gem dependencies in a Gem Layer which is a [Lambda Layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html). From the AWS Docs:

> With layers, you can use libraries in your function without needing to include them in your deployment package.

## Advantage of Gem Layer

An advantage is that it results in your code size being smaller. If your application code is under the key [3 MB](https://docs.aws.amazon.com/lambda/latest/dg/limits.html) limit, you are able to see and edit your Lambda code in the AWS Lambda console code editor **live**.  This is helpful to debug and test without a full deploy. This only works with `config.package_type = "zip"`.

