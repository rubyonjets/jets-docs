---
title: "Jets Job Existing Queue"
nav_text: Existing
category: jobs
order: 5
desc: How to use an pre-created existing SQS Queue.
---

## Configure Existing Queue

To have Jets use an existing FIFO Queue

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.job.enable = true
  config.job.queue.existing = "my-queue"
end
```

**Note**: If you have 2 Lambda Function triggers registered to the same Queue, it's becomes indeterminate which one handles the processing, whichever gets to it first.
