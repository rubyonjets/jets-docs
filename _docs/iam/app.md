---
title: App IAM Permissions
nav_text: App
category: iam
subcategory: iam-app
order: 1
---

Your app will need different IAM permissions to access AWS resources. For example, it might need access to S3 to upload files oror SNS access to send a message. When your app runs on AWS Lambda, the Lambda Function IAM Role contains these permissions. In these docs, we'll discuss ways to manage these permissions.

{% assign docs = site.docs | where: "categories","iam-app" | sort: "order" %}
{% for doc in docs %}
* [{{doc.nav_text}}]({{doc.url}}){% endfor %}
