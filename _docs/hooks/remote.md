---
title: Jets Remote Runner Hooks
nav_text: Remote
category: hooks
subcategory: hooks-remote
order: 1
---

You can hook into the remote runner process and run custom code with hooks. Available hooks:

* before_deploy
* after_deploy
* before_delete
* after_delete

These hooks run within the remote jets deploy process **outside** of Docker on the CodeBuild server host.

## Configure

To configure remote hooks, define them in a folder like so:

config/jets/hooks/before_deploy

```bash
#!/bin/bash
echo "running my before_deploy bash hook script"
```

The script can be written in any language available on the codebuild remote runner. Here's an example in Ruby.

config/jets/hooks/before_deploy

```bash
#!/usr/bin/env ruby
puts "running my before_deploy ruby hook script"
```

## Context

The directly which the hooks run is the project root that the app code has been downloaded to.