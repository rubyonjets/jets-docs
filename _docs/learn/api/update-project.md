---
title: Update Project
search_title: Update Project API
category: learn-api
order: 9
---

{% include learn/update-project-lambda-console-edit.md mode="api" %}

## Jets Logs

You can also use the `jets logs` command to tail the logs in your terminal.

    ❯ jets logs -f
    2023-10-29 01:59:18 UTC INIT_START Runtime Version: ruby:3.2.v9 Runtime Version ARN: arn:aws:lambda:us-west-2::runtime:b96ddb9b1905c3979339d7706a5f7cfda1d851593b1255eb0f15ff573c17fd28
    2023-10-29 01:59:21 UTC START RequestId: 30131e6d-1ee9-4956-a485-6c703cd8eae4 Version: $LATEST
    2023-10-29 01:59:21 UTC Started GET "/posts" for 15.158.54.12 at 2023-10-29 01:59:21 +0000
    2023-10-29 01:59:21 UTC Processing PostsController#index
    2023-10-29 01:59:21 UTC   Event: {"resource":"/{catchall+}","path":"/posts","httpMethod":"GET","headers":{"Accept":"*/*","CloudFront-Forwarded-Proto":"https","CloudFront-Is-Desktop-Viewer":"true","CloudFront-Is-Mobile-Viewer":"false","CloudFront-Is-SmartTV-Viewer":"false","CloudFront-Is-Tablet-Viewer":"false","CloudFront-Viewer-ASN":"16509","CloudFront-Viewer-Country":"US","Host":"2bmdurd1ra.execute-api.us-west-2.amazonaws.com","User-Agent":"curl/7.81.0","Via":"2.0 4b800f7fa2c3fbb9f4f3c505b0df315e.cloudfront.net (CloudFront)","X-Amz-Cf-Id":"fL1obeybJNI_ePtuHPqFtWSdhuPMVv-kUrqohz_y_6oMOUso4YgSkg==","X-Amzn-Trace-Id":"Root=1-653dbc75-7befc9201424c9594a6aa433","X-Forwarded-For":"35.162.212.186, 15.158.54.12","X-Forwarded-Port":"443","X-Forwarded-Proto":"https"},"multiValueHeaders":{"Accept":["*/*"],"CloudFront-Forwarded-Proto":["https"],"CloudFront-Is-Desktop-Viewer":["true"],"CloudFront-Is-Mobile-Viewer":["false"],"CloudFront-Is-SmartTV-Viewer":["false"],"CloudFront-Is-Tablet-Viewer":["false"],"CloudFront-Viewer-ASN":["16509"],"CloudFront-Viewer-Country":["US"],"Host":["2bmdurd1ra.execute-api.us-west-2.amazonaws.com"],"User-Agent":["curl/7.81.0"],"Via":["2.0 4b800f7fa2c3fbb9f4f3c505b0df315e.cloudfront.net (CloudFront)"],"X-Amz-Cf-Id":["fL1obeybJNI_ePtuHPqFtWSdhuPMVv-kUrqohz_y_6oMOUso4YgSkg=="],"X-Amzn-Trace-Id":["Root=1-653dbc75-7befc9201424c9594a6aa433"],"X-Forwarded-For":["35.162.212.186, 15.158.54.12"],"X-Forwarded-Port":["443"],"X-Forwarded-Proto":["https"]},"queryStringParameters":null,"multiValueQueryStringParameters":null,"pathParameters":{"catchall":"posts"},"stageVariables":null,"requestContext":{"resourceId":"6mhwk1","resourcePath":"/{catchall+}","httpMethod":"GET","extendedRequestId":"NipiaE1oPHcEjLQ=","requestTime":"29/Oct/2023:01:59:17 +0000","path":"/dev/posts","accountId":"536766270177","protocol":"HTTP/1.1","stage":"dev","domainPrefix":"2bmdurd1ra","requestTimeEpoch":1698544757528,"requestId":"96b388e4-2b69-4e5d-a28a-41a203abc922","identity":{"cognitoIdentityPoolId":null,"accountId":null,"cognitoIdentityId":null,"caller":null,"sourceIp":"35.162.212.186","principalOrgId":null,"accessKey":null,"cognitoAuthenticationType":null,"cognitoAuthenticationProvider":null,"userArn":null,"userAgent":"curl/7.81.0","user":null},"domainName":"2bmdurd1ra.execute-api.us-west-2.amazonaws.com","apiId":"2bmdurd1ra"},"body":null,"isBase64Encoded":false}
    2023-10-29 01:59:21 UTC   Parameters: {"catchall":"posts"}
    2023-10-29 01:59:21 UTC debugging posts#index called
    2023-10-29 01:59:21 UTC Completed Status Code 200 in 0.374s
    2023-10-29 01:59:21 UTC END RequestId: 30131e6d-1ee9-4956-a485-6c703cd8eae4
    2023-10-29 01:59:21 UTC REPORT RequestId: 30131e6d-1ee9-4956-a485-6c703cd8eae4  Duration: 455.15 ms     Billed Duration: 456 ms Memory Size: 1536 MB       Max Memory Used: 178 MB Init Duration: 2963.50 ms


The `jets log` command will use the Log Group from the controller Lambda function, IE: `/aws/lambda/demo-dev-controller`, so we do not have to specify the name like we did in the [Jets Project Job Learn Guide]({% link _docs/learn/job/update-project.md %}#jets-logs).

## Update Code and Deploy Changes

So far, we have been making manual changes. We should codify the changes. To help see the changes, let's make some additional changes so that it's easy to check.

app/controllers/posts_controller.rb

```ruby
class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    puts "debugging again posts#index called"
    @posts = Post.all

    render json: @posts
  end

  # ....
end
```

Deploy again

    ❯ jets deploy
    Deploying to Lambda demo-dev app...
    ...
    02:05:53AM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE
    Time took: 1m 16s
    Prewarming application.
    API Gateway Endpoint: https://2bmdurd1ra.execute-api.us-west-2.amazonaws.com/dev/

Once changes have been deployed, confirm Lambda Source code changes.

![](https://img.boltops.com/tools/jets/learn/api/update-project-confirm-lambda-changes.png)

If you still have `jets logs` running in a terminal, you'll logs as you're testing.

Next, we'll delete the project.
