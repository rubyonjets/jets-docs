## How Jets Delete Works

1. Jets packages code and uploads it to S3 to handle deletion.
2. The Remote Runner syncs a bootstrap stack which removes and deletes most of the resources.
3. The final step performs the remaining deletion of the S3 bucket and CodeBuild Remote Runner.

Since everything is codified, you nicely end up back in a clean state. 😄

Congrats! You have successfully created, modified, and deleted a Jets {{ include.framework }} project.

Next, we'll look at some next steps.
