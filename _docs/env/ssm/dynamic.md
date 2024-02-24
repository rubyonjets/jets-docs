---
title: SSM Dynamic
nav_text: Dynamic
category: env-ssm
order: 1
---

Here are some notes for using CloudFormation dynamic references for SSM Parameter Store values.

* [CloudFormation Using dynamic references to specify template values](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html)

The general form is: {% raw %}`{{resolve:ssm:parameter-name:version}}`{% endraw %}

## Works

{% raw %}
    FOO="{{resolve:ssm:/demo/development/FOO:1}}"
    FOO="{{resolve:ssm:/demo/development/FOO}}" # latest version
{% endraw %}

## Does Not Work

{% raw %}
    FOO="{{resolve:ssm-secure:/demo/development/FOO:1}}"
    FOO="{{ssm:/demo/development/FOO:1}}"
{% endraw %}

