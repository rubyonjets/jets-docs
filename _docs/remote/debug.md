---
title: CodeBuild Remote Runner Debugging Tips
nav_text: Debug
category: remote
order: 8
---

Inspecting the generated CloudFormation template that Jets builds is useful for debugging.

    jets build --templates

You can see the template with:

    ls /tmp/jets/demo/templates
    cat /tmp/jets/demo/templates/parent.yml | yq
    cat /tmp/jets/demo/templates/controller.yml | yq

Also see: [Remote Compute Type]({% link _docs/remote/codebuild/compute-type.md %}#lambda-compute)
