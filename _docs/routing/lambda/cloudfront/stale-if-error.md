---
title: Lambda URL CloudFront Stale-If-Error Cache Control
nav_text: Stale If Error
category: routing-lambda-cloudfront
order: 4
---

CloudFront supports 2 interesting cache control directives:

* **stale-while-revalidate**: CloudFront will serve stale content while it's fetching fresh content in the background. This allows users to experience fast response times in case the origin is slow.
* **stale-if-error**: CloudFront will serve stale content if the origin is down, IE: 50x to 60x errors.

## Stale While Reinvalidate

An interesting note from the [AWS Docs Expiration](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html)

> Additionally, if your content doesn't change or rarely changes, stale-while-revalidate could add unnecessary network requests. Instead, consider setting a long cache duration.

So Stale If Error seems less useful than a long cache duration.

## Stale If Error

This feature can save you if your site is down for whatever reason. In the rare event that AWS Lambda is down, CloudFront can still serve stale content. Of course, this setting should only be used for logged-out pages that can be cached. The app would need to return the cache directive in a header.

    Cache-Control: max-age=3600, stale-while-revalidate=600, stale-if-error=86400

Consider making the login buttons or sections of the page a part of an AJAX call to serve a cachable page to CloudFront.
