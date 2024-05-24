---
title: "Jets Job FIFO Queue"
nav_text: FIFO
category: jobs
order: 5
desc: How to use a FIFO Queue instead of a Standard Queue.
---

## Configure FIFO Queue

To have Jets create a managed FIFO Queue instead of a Standard Queue, configure the `job.queues.default.properties`.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.job.enable = true
  config.job.default_queue.properties = {FifoQueue: true}
end
```

The properties map to AWS CloudFormation [AWS::SQS::Queue](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sqs-queue.html#cfn-sqs-queue-fifoqueue).

