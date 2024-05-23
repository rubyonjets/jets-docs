lambda.controller.timeout | 30 | Default timeout for controller Lambda function. This is shorthand instead of `lambda.controller.properties`
lambda.controller.memory_size | 1536 | Default memory size for controller Lambda function. This is shorthand instead of `lambda.controller.properties`
lambda.controller.properties | {} | Override [Lambda Function properties](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html).
lambda.controller.enable | true | Enables creation of Controller Function.
{% include reference/config/deploy/lambda/controller-concurrency.md %}
lambda.function.timeout | 30 | Default timeout for Lambda functions. This is shorthand instead of `lambda.function.properties`
lambda.function.memory_size | 1536 | Default memory size for Lambda functions. This is shorthand instead of `lambda.function.properties`
lambda.function.properties | {} | Override [Lambda Function properties](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-lambda-function.html).
{% include reference/config/deploy/lambda/function-concurrency.md %}
lambda.function.timeout | 30 | Default timeout for lambda functions.
{% include reference/config/deploy/lambda/iam.md %}
lambda.layers | [] | Additional custom lambda layers to use.