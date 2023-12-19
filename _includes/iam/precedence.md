For [Jets Events]({% link _docs/events.md %}), you can control the IAM policies associated with your Lambda functions even more finely. Here are the ways and their precedence:

1. **Function-specific IAM policy**: highest precedence. Applies for the distinct Lambda function.
2. **Class-wide IAM policy**: Applies for all Lambda functions for the class.
3. **Application-wide IAM policy**: lowest precedence. Applies for all Lambda functions of the Jets application.

## Controller vs Events IAM Policies

Jets handles all controller requests with a single Lambda function. You can only define IAM policies for all controllers in `config/jets/deploy.rb`.

For [events]({% link _docs/events.md %}), you have the ability to control IAM Policies at the ApplicationEvent or at individual Lambda function level because Jets always deploys an distinct Lambda functions for each event method.
