---
title: "Jets AWS Lambda Package Type: Image or Zip"
nav_text: Package Type
category: config
order: 8
---

By default, Jets uses the image package type to deploy your app to AWS Lambda. Jets can deploy your project AWS Lambda with either [Image or Zip package type](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html), though.

**Important**: Jets only supports the `image` package type for Rails. If you try to deploy the zip format for Rails, the deploy will error. For Sinatra and other frameworks, you can use either image or zip formats. The AWS Lambda Runtime is more limited with the zip package type. Even common gems like nokogiri can have some issues.

## Config

To configure the package type that Jets should deploy.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.package_type = "image"
end
```

**Note**: If you're using Rails, Jets only supports the image format for Rails.

If you're using the zip type because building a simple app that does even need a controller Lambda Function, you can also disable the creation of the controller with: `config.lambda.controller.enable = false`.

## Image vs Zip Package Type

The Image format is a Docker Image. The Zip format is your app code packaged in a zip file. There are pros and cons to each format.

## Advantages to Docker Image / Disadvantages to Zip

{% include config/package-type/pros.md %}

## Disadvantages to Docker Image / Advantages to Zip

{% include config/package-type/cons.md %}

**Important**: Once a pacakge format is choosen, you cannot change it without first deleting the and redeploying.
