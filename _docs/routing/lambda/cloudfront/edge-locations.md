---
title: Lambda URL CloudFront Price Class Edge Locations
nav_text: Edge Locations
category: routing-lambda-cloudfront
order: 4
---

You can configure CloudFront to use different Price Classes which control which Edge Locations to enable.

* **PriceClass_All**: Use all edge locations (best performance)
* **PriceClass_200**: Use only North America and Europe
* **PriceClass_100**: Use North America, Europe, Asia, Middle East, and Africa

The Jets default for the CloudFront distribution in front of the Lambda URL is `PriceClass_100`. This is can more [cost-effective](https://notes.paulswail.com/public/What+Pricing+Class+should+I+choose+for+a+CloudFront+distribution). If you want to adjust this.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.price_class = "PriceClass_All"
end
```

Note: Previously, deploy times were much faster with PriceClass_100 than PriceClass_All. AWS has made improvements since, [Slashing CloudFront change propagation times in 2020](https://aws.amazon.com/blogs/networking-and-content-delivery/slashing-cloudfront-change-propagation-times-in-2020-recent-changes-and-looking-forward/) and CloudFront propagation times are now around 5 minutes.

## Deployment Times

CloudFront distributions take a while to deploy, about 5 minutes. However, I've found that they are live much faster than the deployment time. Usually, CloudFront distribution updated settings are already in affect within 10 seconds or so. I believe this is because CloudFront validates all the edge nodes around the world before confirming that the deployment is completed.
