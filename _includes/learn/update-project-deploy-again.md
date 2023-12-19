Deploy again

    ❯ jets deploy -y
    Packaging code for deploy: {{ include.framework }}-dev
    Started remote run for deploy
    Ctrl-C will stop showing logs. Jets will continue to run remotely.
    If you want to stop the remote process, use: jets stop
    Console Log Url:
    https://us-west-2.console.aws.amazon.com/codesuite/codebuild/projects/{{ include.framework }}-dev-remote/build/{{ include.framework }}-dev-remote%3Abc307021-b524-49fc-b594-af39c1fca62c/log
    ...
    Running: jets-remote deploy
    ...
    #14 [build  7/13] RUN bundle install
    ...
    Built docker image: {{ include.framework }}-dev-build-18a17437
    Building CloudFormation templates
    Built CloudFormation templates at /tmp/jets/{{ include.framework }}-dev/templates
    Deploying app: {{ include.framework }}-dev
    Waiting for stack to complete
    09:07:02PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack {{ include.framework }}-dev User Initiated
    ...
    09:08:04PM UPDATE_COMPLETE AWS::CloudFormation::Stack {{ include.framework }}-dev
    Stack success status: UPDATE_COMPLETE
    Release 2: https://www.rubyonjets.com/projects/{{ include.framework }}/releases/release-rNYWfkTivZkKcnFl
{% if include.framework != "events" %}    Prewarming application
    Lambda Url {{ include.lambda_url }}{% endif %}

Once changes have been deployed, confirm Lambda Source code changes.

![](https://img.boltops.com/tools/jets/learn/{{ include.framework }}/update-project-confirm-lambda-changes.png)

If you still have [jets logs]({% link _reference/jets-logs.md %}) running in a terminal, you'll see logs tailing as you're testing.

Next, we'll delete the project.
