lambda.controller.provisioned_concurrency | nil | This applies to the controller Lambda Function and takes higher precedence the `lambda.function.provisioned_concurrency`. Pre-initialized **always running** function "instances".  There are extra costs to use this. See: [Config Concurrency]({% link _docs/config/concurrency.md %})
lambda.controller.reserved_concurrency | 25 | This applies to the controller Lambda Function and takes higher precedence the `lambda.function.reserved_concurrency`. Guaranteed and **maximum** number of function "instances" to run from the AWS Account default concurrency pool. This can be used to limit concurrency. There is no extra cost for this. See: [Config Concurrency]({% link _docs/config/concurrency.md %})