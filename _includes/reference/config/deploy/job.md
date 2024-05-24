job.additional_queues | [] | Example: %w[urgent low_priority]
job.default_queue.lambda.reserved_concurrency | 5 | Reserved concurrency to use for Lambda function associated with default queue.
job.default_queue.properties | {} | Override the SQS Queue properties. See [Generated Function SQS Queue]({% link _docs/events/sqs.md %}#generated-function-sqs-queue) and [AWS::SQS::Queue](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sqs-queue.html).
job.enable | false | Enable Jets to create Job resources to handle ActiveJob work, like SQS Queue.
job.queue_defaults.lambda.memory_size | 1536 | Default reserved concurrency for memory_size lambda functions. Can be overwritten individually with `config.job.queues.NAME.lambda.memory_size`
job.queue_defaults.lambda.properties | {} | Default properties for the additional_queues lambda functions. Can be overwritten individually with `config.job.queues.NAME.lambda.PROPERTY`
job.queue_defaults.lambda.reserved_concurrency | 5 | Default reserved concurrency for additional_queues lambda functions. Can be overwritten individually with `config.job.queues.NAME.lambda.reserved_concurrency`
job.queue_defaults.lambda.timeout | 900 | Default timeout for additional_queues lambda functions. Can be overwritten individually with `config.job.queues.NAME.lambda.timeout`
job.queue_defaults.properties | {} | Default properties for the additional_queues. Can be overwritten individually with `config.job.queues.NAME.PROPERTY`. See [AWS::SQS::Queue](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-sqs-queue.html)
job.queues.NAME.memory_size | 1536 | An example of how you can set individual additional queue the memory_size setting.
job.queues.NAME.reserved_concurrency | 5 | An example of how you can set individual additional queue the reserved_concurrency setting.