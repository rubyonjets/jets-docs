## CloudFormation Controllers Build Setting

Important: In Jets v5, a single Lambda function handles all controller requests. You can only define IAM policies for all controllers in ApplicationController or in `config/application.rb`.

For [jobs]({% link _docs/jobs.md %}), you have the ability to control IAM Policies at the individual Lambda function level because Jets always deploys an distinct Lambda functions for each job method.
