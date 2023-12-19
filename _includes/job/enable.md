To enable the creationg of Jets Job resources to handle ActiveJob work:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.job.enable = true
end
```

This creates:

1. The SQS Queue to store the jobs
2. The Lambda Function that listens to Queue events and processes the jobs

AWS Lambda scales automatically to process the queue.

## Jets Job ActiveJob Adapter

Jets provides a `jets_job` ActiveJob adapter that queues jobs to SQS. To enable it:

config/environments/production.rb

```ruby
Rails.application.configure do
  config.active_job.queue_adapter = :jets_job
end
```
