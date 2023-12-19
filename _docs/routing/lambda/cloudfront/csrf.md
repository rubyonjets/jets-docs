---
title: Lambda URL CloudFront CRSF Errors
nav_text: CRSF
category: routing-lambda-cloudfront
order: 8
---

**Important**: Jets creates a CloudFront distribution that is capable of sending the host to the origin. So you should not get this error. See: [CloudFront Host]({% link _docs/routing/lambda/cloudfront/host.md %}). You might only get this error if you have disabled the CloudFront Function or overriden the default.

## CRSF Error

If you're seeing an error like this:

    > Started PATCH "/posts/11908" for 2002:42ea:d0d2:0:d58f:3db0:3686:27cc at 2024-03-30 17:51:11 +0000
    Processing by PostsController#update as TURBO_STREAM
    Parameters: {"authenticity_token"=>"[FILTERED]", "post"=>{"title"=>"Test post 1 Edit 1", "body"=>"", "published"=>"0"}, "commit"=>"Update Post", "id"=>"11908"}
    HTTP Origin header (https://www.domain.com) didn't match request.base_url (https://m2q3b2ktbpytxplhqz2ovm7sxi0mjekx.lambda-url.us-west-2.on.aws)
    Completed 422 Unprocessable Entity in 0ms (ActiveRecord: 0.0ms | Allocations: 180)
    ActionController::InvalidAuthenticityToken (HTTP Origin header (https://www.domain.com) didn't match request.base_url (https://m2q3b2ktbpytxplhqz2ovm7sxi0mjekx.lambda-url.us-west-2.on.aws)):
    actionpack (7.1.3.2) lib/action_controller/metal/request_forgery_protection.rb:293:in `handle_unverified_request'
    actionpack (7.1.3.2) lib/action_controller/metal/request_forgery_protection.rb:388:in `handle_unverified_request'
    actionpack (7.1.3.2) lib/action_controller/metal/request_forgery_protection.rb:377:in `verify_authenticity_token'

## Explanation

This is a Rails CRSF error. This particularly can happen when you're using CloudFront with Lambda.  CloudFront proxies the request:

    www.domain.com => m2q3b2ktbpytxplhqz2ovm7sxi0mjekx.lambda-url.us-west-2.on.aws

For security reasons, CloudFront proxies the request so the Host Header is the Origin Host itself, not the CloudFront user-facing URL.

* So the Rails Origin still sees the Function URL m2q3b2ktbpytxplhqz2ovm7sxi0mjekx.lambda-url.us-west-2.on.aws in the Host Header.
* However, the web request comes from the CloudFront user-facing url www.domain.com
* Hence, you get the dreaded ActionController::InvalidAuthenticityToken error

## Solution

Jets allows you to override to the Host sent to the Rails Lambda Function. This can be done with `JETS_SHIM_HOST`.  When you configure cloudfront, Jets will automatically use the first CloudFront aliases as the `JETS_SHIM_HOST`. If you do not have aliases, Jets uses the conventional aliases it creates. IE: demo-dev.domain.com

In general, you should not have to set `JETS_SHIM_HOST` though, since Jets sends the host to the origin.