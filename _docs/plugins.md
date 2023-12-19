---
title: Jets Plugins
nav_text: Plugins
category: top-level
order: 30
---

Jets plugins help deploy your app. Some examples:

* jets-rails
* jets-sinatra

## How Plugins Work

Plugins do a very little. In fact, you can deploy your app without the plugin, and Jets still works on AWS Lambda. So, what exactly do plugins bring to the table?

The primary function of plugins is to hook into the framework's boot process and ensure `Jets.boot` also runs locally. This ensures that Jets-specific autoload paths like `app/events` work locally too. On AWS Lambda, the `Jets.shim` is the first thing that is called and it automatically calls `Jets.boot` already. In essence, plugins replicate this behavior locally.

For Rails, an Engine configures autoload paths like `app/events` to be managed by Jets instead of Rails. This is because some paths, like your custom Jets extensions, must be eagerly loaded upon boot to be available for code analysis and deployment.