---
title: SSM Dynamic
nav_text: Dynamic
category: env-ssm-archive
order: 88
---

Note: Archive because unsure if will support.

Here are some notes for using CloudFormation dynamic references for SSM Parameter Store values. You can use dynamic references if you do not want the values to be stored in the cloudformation template. Though, debugging them is harder.

* [CloudFormation Using dynamic references to specify template values](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html)

The general form is: {% raw %}`{{resolve:ssm:parameter-name:version}}`{% endraw %}

## Works

{% raw %}
    FOO="{{resolve:ssm:/demo/dev/FOO:1}}"
    FOO="{{resolve:ssm:/demo/dev/FOO}}" # latest version
{% endraw %}

## Does Not Work

{% raw %}
    FOO="{{resolve:ssm-secure:/demo/dev/FOO:1}}"
    FOO="{{ssm:/demo/dev/FOO:1}}"
{% endraw %}

