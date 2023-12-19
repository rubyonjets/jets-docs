---
title: Jets CI Debugging Tips
nav_text: Debug
category: ci
order: 88
---

One way to debug the CI CodeBuild project is to inspect the generated CloudFormation template.

    jets ci:build

You can see the template with:

    cat /tmp/jets/demo/templates/ci.yml | yq

Also see: [Remote Compute Type]({% link _docs/remote/codebuild/compute-type.md %}#lambda-compute)
