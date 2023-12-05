---
title: Jets Pro
category: top-level
order: 22
---

## What is Jets Pro?

[Jets Pro](https://www.rubyonjets.com) is an paid service that provides additional features to Jets. It provides you with:

* **Dashboard**: Provides an overview of deployed apps with a web browser.
* **Release History**: See and audit your release history.
* **Rollback Ability**: Rollback code when you need to.
* **Gems**: Access to precompiled gems for AWS Lambda

## Dashboard

Jets Pro also provides a dashboard that shows deployment history. It allows you to see clearly whenever your app is deployed. You can also manage your Jets Pro account and plan with it.

## Release History

You can also see your app history with the CLI.

    ❯ jets releases
    +---------+-----------------+--------------+---------------+
    | Version |     Status      | Released At  |    Message    |
    +---------+-----------------+--------------+---------------+
    | 8       | UPDATE_COMPLETE | 1 minute ago | Deploy        |
    | 7       | UPDATE_COMPLETE | 2 hours ago  | Deploy        |
    | 6       | UPDATE_COMPLETE | 10 hours ago | Deploy        |
    | 5       | UPDATE_COMPLETE | 11 hours ago | Rollback to 3 |
    | 4       | UPDATE_COMPLETE | 12 hours ago | Deploy        |
    | 3       | UPDATE_COMPLETE | 13 hours ago | Deploy        |
    | 2       | UPDATE_COMPLETE | 14 hours ago | Deploy        |
    | 1       | UPDATE_COMPLETE | 15 hours ago | Deploy        |
    +---------+-----------------+--------------+---------------+

## Rollback Ability

You can rollback a release with:

    jets rollback 3

## Precompiled Gems

Jets Pro provides access to precompiled gems for AWS Lambda.  Some example gems are nokogiri, mysql2, and pg. Otherwise, you are responsible for providing the compiled gems that your Jets app requires. You must build your own [Custom Lambda Layers]({% link _docs/extras/custom-lambda-layers.md %}).

## Disabling Pro

If you want to disable Jets Pro, you can configure

```ruby
Jets.application.configure do
  config.pro.disable = true
end
```

This disables all the Jets Pro features.

## Open Source

Jets Pro provides a financial means of supporting Jets development and work. However, if you have an Open Source project using Jets, you can possibly get Jets Pro for free. We'll review and consider the project. Not all projects may be approved. We'll continue supporting Open Source projects as long it's financially sustainable.
