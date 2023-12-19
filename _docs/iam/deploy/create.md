---
title: "Minimal Deploy IAM: Creating the Policy"
nav_text: Create
category: iam-deploy
order: 8
---

## Creating with the Console

You can create policy, group, and user in AWS console.

Go to [IAM Policies](https://console.aws.amazon.com/iam/home?nc2=h_m_sc#/policies).

1. Click "Create policy", then "JSON", then "Next: tags", then "Next: review".
2. Name the policy "JetsPolicy" and click "Create policy".

Go to [IAM Groups](https://console.aws.amazon.com/iam/home?nc2=h_m_sc#/groups).

1. Click "Create new group". Name the group "Jets" and click "Next step".
2. Search for "JetsPolicy", check its checkbox, click "Next step", then "Create group".

Go to [IAM Users](https://console.aws.amazon.com/iam/home?nc2=h_m_sc#/users).

1. Click "Add user". Give the user a name and check "Programmatic access".
2. Click "Next: permissions". Check the "Jets" group to add user to group.
3. Click "Next: tags", "Next: Review", then "Create user".

## Creating with the CLI

You can also create the IAM resources with the CLI. Here's a summary of the commands:

    aws iam create-group --group-name Jets
    cat << 'EOF' > /tmp/jets-iam-policy.json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "apigateway:*",
                    "cloudformation:*",
                    "dynamodb:*",
                    "events:*",
                    "iam:*",
                    "lambda:*",
                    "logs:*",
                    "route53:*",
                    "s3:*"
                 ],
                "Resource": [
                    "*"
                ]
            }
        ]
    }
    EOF
    aws iam put-group-policy --group-name Jets --policy-name JetsPolicy --policy-document file:///tmp/jets-iam-policy.json

If your environment requires a "least privilege" approach, these commands will create a policy that has been reported to work well:

    aws iam create-group --group-name Jets
    export MY_PREFIX=my-cool-prefix
    cat <<EOF > /tmp/jets-iam-policy.json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "cloudformation:CreateStack",
                    "cloudformation:DescribeStackEvents",
                    "cloudformation:DescribeStackResource",
                    "cloudformation:DescribeStackResources",
                    "cloudformation:DeleteStack",
                    "cloudformation:UpdateStack"
                ],
                "Resource": [
                    "arn:aws:cloudformation:*:*:stack/${MY_PREFIX}-*",
                    "arn:aws:cloudformation:*:*:stack/${MY_PREFIX}-*/*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "iam:PassRole",
                    "iam:GetRole*",
                    "iam:CreateRole",
                    "iam:PutRolePolicy",
                    "iam:DeleteRolePolicy",
                    "iam:DeleteRole"
                ],
                "Resource": [
                    "arn:aws:iam::*:role/${MY_PREFIX}-*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "lambda:PublishLayerVersion",
                    "lambda:DeleteLayerVersion",
                    "lambda:GetFunction",
                    "lambda:CreateFunction",
                    "lambda:GetLayerVersion",
                    "lambda:DeleteFunction",
                    "lambda:UpdateFunctionCode",
                    "lambda:GetFunctionConfiguration",
                    "lambda:UpdateFunctionConfiguration",
                    "lambda:AddPermission",
                    "lambda:RemovePermission",
                    "lambda:InvokeFunction"
                ],
                "Resource": [
                    "arn:aws:lambda:*:*:function:${MY_PREFIX}-*",
                    "arn:aws:lambda:*:*:layer:prod-${MY_PREFIX}-*:*",
                    "arn:aws:lambda:*:*:layer:dev-${MY_PREFIX}-*:*",
                    "arn:aws:lambda:*:*:layer:prod-${MY_PREFIX}-*",
                    "arn:aws:lambda:*:*:layer:dev-${MY_PREFIX}-*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:CreateBucket",
                    "s3:List*",
                    "s3:Describe*",
                    "s3:Put*",
                    "s3:Get*",
                    "s3:Delete*"
                ],
                "Resource": [
                    "arn:aws:s3:::${MY_PREFIX}-*",
                    "arn:aws:s3:::${MY_PREFIX}-*/*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "apigateway:*",
                    "cloudformation:DescribeStacks",
                    "logs:DescribeLogGroups"
                ],
                "Resource": [
                    "*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "logs:DeleteLogGroup"
                ],
                "Resource": [
                    "arn:aws:logs:*:*:log-group:/aws/lambda/${MY_PREFIX}-*:*:*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "events:PutRule",
                    "events:DescribeRule",
                    "events:RemoveTargets",
                    "events:DeleteRule",
                    "events:PutTargets"
                ],
                "Resource": [
                    "arn:aws:events:*:*:rule/${MY_PREFIX}-*"
                ]
            }
        ]
    }
    EOF
    aws iam put-group-policy --group-name Jets --policy-name JetsPolicy --policy-document file:///tmp/jets-iam-policy.json

Finally, create a user and add the user to IAM group. Here's an example:

    aws iam create-user --user-name tung
    aws iam add-user-to-group --user-name tung --group-name Jets

## Additional IAM Permissions

The baseline IAM policy above might not include all the permissions required depending on what your Jets application does. For example, if you are using [Custom Resources]({% link _docs/custom.md %}), then you would need to add permissions specific to those resources. This is why an IAM group is recommended.  You simply have to update the group policies.

Here's how you add a managed IAM policy that provides the AWS Config Rule permissions:

    aws iam attach-group-policy --policy-arn arn:aws:iam::aws:policy/service-role/AWSConfigRole --group-name Jets

The IAM Policies for the group looks something like this:

![](/img/docs/minimal-iam-policy.png)

