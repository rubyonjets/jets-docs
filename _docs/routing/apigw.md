---
title: API Gateway
nav_text: API Gateway
category: routing
subcategory: routing-apigw
order: 2
---

API Gateway was the default routing service used by Jets 5 and below. In Jets 6 and above, the default routing service is [Lambda Function URL]({% link _docs/routing/lambda.md %}).

## Enabling

If you need to enable API Gateway as a Routing Service, you can.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.apigw.enable = true
end
```

## API Gateway Console Example

![Screenshot of generated API Gateway resources in the AWS Console](https://img.boltops.com/tools/jets/routing/demo-api-gateway.png)

## API Gateway Production Deployment

Important: If you using APIGW and are deploying a production service, it is strongly recommended to use a [Custom Domain]({% link _docs/routing/apigw/custom-domain.md %}). Jets computes and figures out whether or not it needs to replace the REST API as part of deployment. When the REST API is replaced, the API Endpoint will be different. By using Custom Domain, you'll be able to keep the same endpoint.
