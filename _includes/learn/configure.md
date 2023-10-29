Configure AWS so Jets can connect to it. The recommended way is to:

1. set up the `~/.aws/config` and `~/.aws/credentials` files
2. set up your `AWS_PROFILE` and `AWS_REGION` environment variables

## Example

~/.aws/config

    [profile dev]
    output = json
    region = us-west-2

~/.aws/credentials

    [dev]
    aws_access_key_id = REPLACE_ME
    aws_secret_access_key = REPLACE_ME

In your `~/.bashrc` or `~/.profile`, use this line to set the `AWS_PROFILE` and `AWS_REGION` environment variables:

    export AWS_PROFILE=dev
    export AWS_REGION=`aws configure get region` # to match what's in ~/.aws/config

Note, you do not have to AWS_REGION. However, the environment variable AWS_REGION will take higher precedence than the region `~/.aws/config`. You probably want them to match in general.

**Interesting note**: If you want to deploy your Jets app to a different region, you can simply change the AWS_REGION and deploy again.

## Test AWS Setup

Here are some useful commands to test that the AWS CLI is working:

    aws sts get-caller-identity
    aws s3 ls

## Resources

* [AWS CLI Docs](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

Next, we'll create a new project.
