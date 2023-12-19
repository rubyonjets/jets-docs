---
title: Lambda URL CloudFront GeoRestriction
search_title: Lambda URL CloudFront GeoRestriction GeoLocation
nav_text: GeoRestriction
category: routing-lambda-cloudfront
order: 6
---

You can configure CloudFront with [GeoRestriction](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-georestriction.html) based on GeoLocation.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.url.cloudfront.enable = true
  config.lambda.url.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")

  config.lambda.url.cloudfront.restrictions = {
    GeoRestriction: {
      RestrictionType: "whitelist",
      Locations: ["US", "FR"]
    }
  }
end
```

From the AWS Docs:

> CloudFront and MaxMind both use ISO 3166 country codes. For the current list of countries and the corresponding codes, see ISO 3166-1-alpha-2 code on the International Organization for Standardization website.

Related:

* [AWS Docs: CloudFront GeoRestriction Locations](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-cloudfront-distribution-georestriction.html)
* [Geoname Country Codes](https://www.geonames.org/countries/)
