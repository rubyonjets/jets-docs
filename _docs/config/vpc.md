---
title: VPC
category: config
order: 7
---

Though running your AWS Lambda functions within a VPC is supported, unless completely necessary, I still don't generally recommend it. The reasons are:

* **Slow Deletion**: Deleting the Lambda function and ENI network cards takes time: 20 minutes. Interestingly, this 20m penalty only occurs for the very last lambda function. Will provide more details below.
* **Complexity**: You must set up private subnets with a NAT Gateway and appropriately configure security groups. Though not overly complex for those who have worked with AWS VPCs before, there are additional network settings. It's another barrier of entry for those who just want to focus on software, which is the original promise of serverless.
* **Cost**: VPC AWS Lambda functions require private subnets. The private subnets need a NAT, which costs about $32/mo for each AZ. If you also need high availabilty, then you need at least 2 NATs. You can use a shared NAT for multiple AZs to save costs. You can also use [AWS PrivateLink with Lambda](https://aws.amazon.com/blogs/aws/new-use-aws-privatelink-to-access-aws-lambda-over-private-aws-network/), and that can cost about half the price of NATs, depending on your usage. Either way, there's a cost and more complexity.

That being said, if you need to use AWS Lambda with a VPC, feel free to.

**Update 9/3/2019**: [Announcing improved VPC networking for AWS Lambda functions](https://aws.amazon.com/blogs/compute/announcing-improved-vpc-networking-for-aws-lambda-functions/). This removes the extra cold-start penalty associated with Lambda and VPC. It essentially moves the creation of the ENI to function creation time instead of invocation time. This means that the initial `jets deploy` is slower. This also means the `jets delete` is slower.

## How to Configure VPC

To have your Lambda functions use a VPC, here's how you configure vpc_config as an application-wide function property:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.vpc_config = {
    SecurityGroupIds: %w[sg-1 sg-2],
    SubnetIds: %w[subnet-1 subnet-2],
  }
end
```

If `vpc_config` is configured at the application-wide level, Jets will automatically add the necessary VPC-related IAM permissions for you.

## VPC Helpers

If you have your VPC subnets and Security Groups with the **Name** tag, you can look up the security group ids with helpers.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.vpc_config = {
    vpc_id = vpc_id("prod") # lookup by tag Name
    SecurityGroupIds: security_group_ids("lambda-#{Jets.env}", vpc_id: vpc_id),
    SubnetIds: subnet_ids(
      "#{Jets.env}-private-app-us-west-2a",
      "#{Jets.env}-private-app-us-west-2b"
    ),
  }
end
```

The config with helpers show you how you can use the same config for dev and prod since the `Jets.env` is replaced. You can also use separate config files.

## VPC Config Dev vs Prod

Here's an example with separate dev and prod deploy config files.

config/jets/deploy/dev.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.vpc_config = {
    SecurityGroupIds: ["sg-dev1"],
    SubnetIds: ["subnet-dev1", "subnet-dev2"],
  }
end
```

config/jets/deploy/prod.rb

```ruby
Jets.deploy.configure do
  config.lambda.function.vpc_config = {
    SecurityGroupIds: ["sg-prod1"],
    SubnetIds: ["subnet-prod1", "subnet-prod2"],
  }
end
```

## How VPC Config Mode Works

To understand some of the limits of VPC and AWS Lambda, let's briefly cover how it works. When you run your Lambda function, Lambda creates a network card and attaches it to the "container" that your Lambda function runs within. This is how the Lambda function gets 1st class citizen access to VPC features. The Lambda function receives a dedicated network card. Here's a diagram to explain the bootstrap process.

![](https://img.boltops.com/tools/jets/considerations/lambda-bootstrap-vpc.png)

## Slow Cold Start No More

Thanks to AWS improvements, the cold start no longer has to wait for the ENI card to be created. The additional network provisioning process adds unbearable slowness to the Lambda function cold start. Users used to report 10+ seconds.

Thanks to AWS creativity, the provisioning process was moved from the run-time cold start to the creation-time provisioning process. This has essentially eliminated the cold start.

I tested it and can confirm that the slow start of a VPC Lambda function is pretty much the same as a Lambda function without a VPC.

    $ time aws lambda invoke --function-name demo-dev-controller output.txt
    {
        "StatusCode": 200,
        "ExecutedVersion": "$LATEST"
    }
    Executed in    4.53 secs

Both VPC and VPC-less AWS Lambda functions cold starts would vary from 3s to 5s.

## NAT Gateway Required

The Lambda functions `vpc_config` need to contain private subnets that have a NAT Gateway. Public subnets with an Internet Gateway did not work when I tested. The Lambda function would time out. The AWS Lambda console even has a message stating the requirement for a NAT Gateway:

![](/img/docs/considerations/vpc-config-nat-gateway.png)

## Slow Function Deletion: VPC ENI Deletion is Slow

An additional disadvantage of VPC with Lambda is that deleting the network card takes a while. Some have reported up to 40m! [VPC Lambda ENI - Stack Deletion Bug](https://forums.aws.amazon.com/message.jspa?messageID=734756) In my own testing, it took about 25m. CloudFormation waits for the ENI deletion to complete, so it slows down the deploy.

![](/img/docs/considerations/lambda-vpc-delete-time.png)

Here's also the `jets deploy` messages:

    Deploying CloudFormation stack with jets app!
    05:59:41PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    05:59:46PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack CoolEvent
    06:01:05PM UPDATE_COMPLETE AWS::CloudFormation::Stack CoolEvent
    06:01:07PM UPDATE_COMPLETE_CLEANUP_IN_PROGRESS AWS::CloudFormation::Stack demo-dev
    06:01:08PM UPDATE_IN_PROGRESS AWS::CloudFormation::Stack CoolEvent
    06:25:49PM UPDATE_COMPLETE AWS::CloudFormation::Stack CoolEvent
    06:25:49PM UPDATE_COMPLETE AWS::CloudFormation::Stack demo-dev
    Stack success status: UPDATE_COMPLETE
    Time took for stack deployment: 26m 11s.

It takes about 20m to delete the Lambda Function.

I've noticed that sometimes there is slowness with deleting function and sometimes there is not.

Interestingly, believe what is happening is that AWS is reusing ENIs and will not release the ENI until all Lambda functions referencing it are deleted. There are no specifics on how AWS Lambda determines when to "let go" of an ENI, and guessing that AWS will continue to make optimizations here. It's only this slow when deleting the last AWS Lambda function that is using VPC settings.

Noting it because most users may not appreciate this. It's quite clever. Sadly, most users will complain about the 20m deletion when they are deleting their Jets application. Here's also the `jets delete` logs where we know that the last lambda function will take the deletion slowness hit:

    $ jets delete
    Deleting demo-dev...
    Waiting for stack to complete
    07:22:48PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    07:23:12PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsController
    ...
    07:43:15PM DELETE_COMPLETE AWS::CloudFormation::Stack JetsController
    07:43:18PM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    Stack demo-dev deleted.
    Time took for deletion: 20m 39s.
    Project demo-dev deleted!

Note: I've seen deletion take even longer than 20, have seen more than 40m deletion times.

    ❯ jets delete -y
    Deleting project...
    First, deleting objects in s3 bucket demo-dev-s3bucket-7mxq36i6gypz
    Deleting demo-dev...
    Waiting for stack to complete
    04:47:48PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack demo-dev User Initiated
    04:47:50PM DELETE_IN_PROGRESS AWS::IAM::Policy IamPolicy
    04:47:50PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiCors1
    04:47:50PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsPreheatJob
    04:47:50PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiDeployment20230727220554
    04:47:51PM DELETE_COMPLETE AWS::IAM::Policy IamPolicy
    04:48:01PM DELETE_COMPLETE AWS::CloudFormation::Stack ApiCors1
    04:48:01PM DELETE_COMPLETE AWS::CloudFormation::Stack ApiDeployment20230727220554
    04:48:01PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiMethods1
    04:48:12PM DELETE_COMPLETE AWS::CloudFormation::Stack ApiMethods1
    04:48:12PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiResources1
    04:48:12PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack JetsController
    04:48:23PM DELETE_COMPLETE AWS::CloudFormation::Stack ApiResources1
    04:49:07PM DELETE_COMPLETE AWS::CloudFormation::Stack JetsPreheatJob
    05:30:24PM DELETE_COMPLETE AWS::CloudFormation::Stack JetsController
    05:30:24PM DELETE_IN_PROGRESS AWS::CloudFormation::Stack ApiGateway
    05:30:24PM DELETE_IN_PROGRESS AWS::Lambda::LayerVersion GemLayer
    05:30:24PM DELETE_IN_PROGRESS AWS::IAM::Role IamRole
    05:30:25PM DELETE_COMPLETE AWS::IAM::Role IamRole
    05:30:25PM DELETE_COMPLETE AWS::Lambda::LayerVersion GemLayer
    05:30:26PM DELETE_IN_PROGRESS AWS::S3::Bucket S3Bucket
    05:30:26PM DELETE_COMPLETE AWS::S3::Bucket S3Bucket
    Stack demo-dev deleted.
    Time took: 42m 49s
    Time took for deletion: 42m 49s.
    Deleting CloudWatch logs
    Project demo-dev deleted!


## Conclusions

If you need to use AWS Lambda with a VPC, feel free to. AWS has made huge improvements and eliminated the hugest reason against VPC, the cold start penalty. Jets makes it much easier to use a VPC with Lambda. It's only a few configuration settings. You need to have a proper network set up, though, which is where I see folks most running into issues. The Jets side is easy.
