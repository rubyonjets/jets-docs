---
title: Updating PackageType is not supported error
nav_text: Package Type
category: debug
order: 5
---

## Package Type

CloudFormation does not support updating a Lambda Function Package Type format. If you see this error `Updating PackageType is not supported`.

    --------------------------------------------------------------------------------
    Here's the nested stack error details: Embedded stack arn:aws:cloudformation:us-west-2:536766270177:stack/demo-dev-Controller-1WSPSJ0ROO9XK/fb4bc090-f9fa-11ee-ad50-06de9d982e51 was not successfully updated. Currently in UPDATE_ROLLBACK_IN_PROGRESS with reason: The following resource(s) failed to update: [LambdaFunction].
    Stack arn:aws:cloudformation:us-west-2:536766270177:stack/demo-dev-Controller-1WSPSJ0ROO9XK/fb4bc090-f9fa-11ee-ad50-06de9d982e51 Status: UPDATE_ROLLBACK_COMPLETE
    Stack events:
    06:11:57PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev-Controller-1WSPSJ0ROO9XK User Initiated
    06:11:59PM UPDATE_IN_PROGRESS AWS::Lambda::Function LambdaFunction
    06:12:00PM UPDATE_FAILED AWS::Lambda::Function LambdaFunction Resource handler returned message: "Invalid request provided: Updating PackageType is not supported" (RequestToken: 5cb957bc-31aa-6484-db0a-7bb3351ee4bd, HandlerErrorCode: InvalidRequest)
    06:12:00PM UPDATE_ROLLBACK_IN_PROGRESS AWS::CloudFormation::Stack demo-dev-Controller-1WSPSJ0ROO9XK The following resource(s) failed to update: [LambdaFunction].
    06:12:41PM UPDATE_COMPLETE AWS::Lambda::Function LambdaFunction
    06:12:41PM UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack demo-dev-Controller-1WSPSJ0ROO9XK
    06:12:46PM UPDATE_ROLLBACK_COMPLETE AWS::CloudFormation::Stack demo-dev-Controller-1WSPSJ0ROO9XK
    Here's also the AWS Console link to the failed nested stack:

## Solution

You must delete the stack and redeploy.

This is one of the reasons the default package type for Jets is `image`. This is just in case you need the image format later, you won't have to delete and deploy again.
