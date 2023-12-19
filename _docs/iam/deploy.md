---
title: Deploy IAM Permissions
nav_text: Deploy
category: iam
subcategory: iam-deploy
order: 2
---

To deploy your app to AWS Lambda it needs IAM permissions to create and manage the AWS resources. For example, the user or machine will need access to create the CloudFormation stacks, S3 bucket, and CodeBuild project. We'll discuss how to create the IAM permissions in these docs.

{% assign docs = site.docs | where: "categories","iam-deploy" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.nav_text}}]({{doc.url}}){% endfor %}
