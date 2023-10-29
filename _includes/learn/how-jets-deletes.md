## How Jets Deletes

1. Empties managed s3 bucket Jets created to store the CloudFormation templates and your packaged code zip file.
2. Deletes the parent `demo-dev` stack, which in turn deletes the nested stack and all resources associated with the Jets app.
3. Deletes the CloudFormation logs associated with the Lambda functions.

Since everything is codified, you end up back in a clean state. 😄

Congrats! You have successfully created, modified, and deleted a Jets API Project.

Next, we'll look at some next steps.
