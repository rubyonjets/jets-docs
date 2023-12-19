---
title: Jets CodeBuild Customizations
nav_text: CodeBuild
category: hooks
order: 3
---

{% include notes/experimental.md %}

## Customize buildspec.yml

You can also customize the CodeBuild remote runner `buildspec.yml`. Create the file in your project root.

buildspec.yml

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      ruby: latest
  build:
    commands:
    - echo "hello custom logic"
    - RUN_JETS_REMOTE
```

Note: The `RUN_JETS_REMOTE` is a special marker that should be in the `buildspec.yml`. It is validated by Jets and used to run the jets remote deploy process.

It is important to note that any commands you add before the `RUN_JETS_REMOTE` process will not have full access to the app jets code yet because the the `RUN_JETS_REMOTE` process itself downloads the app code.

If your hook need access to the app code, instead use: [Jets Remote Runner Hooks]({% link _docs/hooks/remote.md %})

## Probably Better Not To Use

This ability should probably be reserved for super special use cases. Let us know what you're using it for so we can consider implementing it in Jets more natively.
