---
title: Update Project
search_title: Update Project Job
category: learn-job
order: 9
---

Let's make some changes. Let's start with manual changes. It'll help you get to know how things work.

## Change Lambda Function

The Lambda Console allows us to edit code directly with the browser. It allows us to test, debug, and learn quickly. We'll change the text to "Test with".

![](https://img.boltops.com/tools/jets/learn/job/update-project-manual.png)

You can click **Deploy** to deploy the changes.

## Change CloudWatch Event Rule

Instead of clicking **Test**, we'll make some manual changes to the CloudWatch Event Rule to ensure it works properly. A quick way to find the CloudWatch Event Rule is from the CloudFormation stack.

![](https://img.boltops.com/tools/jets/learn/job/review-deploy-cloudformation-console.png)

You can click on the Physical ID of the CloudWatch Event Rule, and it'll take you to the EventBridge console.

![](https://img.boltops.com/tools/jets/learn/job/update-project-eventbridge-console.png)

The code we deploy sets a rate of 10 hours. Let's change it to 1 minute.

![](https://img.boltops.com/tools/jets/learn/job/update-project-eventbridge-console-edit.png)

You can leave the other settings the same and click **Next** a few times and click on **Update Rule** to save the changes.

## Jets Logs

To confirm that the Event Rule is firing every 1 minute, we'll use `jets logs` this time. We want to follow the logs and specify the name of hard_job-perform. Here's an example.

    ❯ jets logs -f -n hard_job-perform
    Tailing logs for /aws/lambda/demo-dev-hard_job-perform
    2023-10-29 02:53:44 UTC START RequestId: 2e1e92ca-2b43-463a-a107-c5c9a980c946 Version: $LATEST
    2023-10-29 02:53:44 UTC Do something with event {"version"=>"0", "id"=>"0619bfa8-8f56-2dc6-bd8c-a9cc4b98ed60", "detail-type"=>"Scheduled Event", "source"=>"aws.events", "account"=>"536766270177", "time"=>"2023-10-29T02:53:16Z", "region"=>"us-west-2", "resources"=>["arn:aws:events:us-west-2:536766270177:rule/demo-dev-HardJob-BABMHLBCK-HardJobPerformEventsRule-jwNlQMmky4tX"], "detail"=>{}}
    2023-10-29 02:53:44 UTC END RequestId: 2e1e92ca-2b43-463a-a107-c5c9a980c946
    2023-10-29 02:53:44 UTC REPORT RequestId: 2e1e92ca-2b43-463a-a107-c5c9a980c946  Duration: 2.42 ms       Billed Duration: 3 ms   Memory Size: 1536 MB       Max Memory Used: 162 MB

You should see the event being triggered every 1 minute.

## Update Code and Deploy Changes

So far, we have been making manual changes. We should codify the changes. To help see the changes, let's make some additional changes so that it's easy to check. We'll use a rate of `2 minutes` and `Debug event` for the puts text this time.

app/jobs/hard_job.rb

```ruby
class HardJob < ApplicationJob
  rate "2 minutes"
  def perform
    puts "Debug event #{event}"
  end
end
```

Deploy again

    ❯ jets deploy
    Deploying to Lambda demo-dev app...
    ...
    03:37:19AM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE

Once changes have been deployed, confirm Lambda Source code changes.

![](https://img.boltops.com/tools/jets/learn/job/update-project-confirm-lambda-changes.png)

The CloudWatch Event Rule changes.

![](https://img.boltops.com/tools/jets/learn/job/update-project-confirm-rule-changes.png)

If you still have `jets logs` running in a terminal, you'll see the event fire again in about 2 minutes.

Next, we'll delete the project.
