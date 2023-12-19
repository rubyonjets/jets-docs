Summary:

* **Reserved concurrency**: Guaranteed and **maximum** number of function "instances" to run from the AWS Account default concurrency pool, usually 1,000. There is no extra cost for this. See: [Reserved Concurrency Concept](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html#reserved-concurrency-concept)
* **Provisioned concurrency**: Pre-initialized **always running** function "instances".  There are extra costs to use this.

Interestingly, Reserved concurrency can be used to limit requests and control costs since AWS Lambda bills for both request and duration. AWS Lambda bills for the processed requests regardless of whether or not it returns its `TooManyRequestsException`, but the duration is shorter. This is similar to traditional EC2 instances. Even if an EC2 instance returns an error, you still get charged for the request. Generally, users still stop requesting after getting error responses.
