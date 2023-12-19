---
title: Overview
---

## What is Jets?

Jets is a [Deployment Service](https://www.rubyonjets.com/). Jets makes it easy to deploy and run your app on Serverless. It packages up your code and runs it on AWS Lambda. Jets can deploy [Rails]({% link _docs/learn/rails.md %}), [Sinatra]({% link _docs/learn/sinatra.md %}), [Hanami]({% link _docs/learn/hanami.md %}), and any [Rack]({% link _docs/learn/rack.md %}) app.

## Jets Account

To use Jets, you need a Jets account. You can sign up at [www.rubyonjets.com](https://www.rubyonjets.com/) and create an API token key there. There is a 2-week free usage period for your AWS account. After that, a paid plan is required. You pay a flat monthly  price for each stack. Here's the [pricing](https://www.rubyonjets.com/pricing).

## Rails Support

To deploy your Rails app, Jets uses your code to build a [Docker image](https://docs.rubyonjets.com/docs/config/package-type/) and deploy it to AWS Lambda.

The steps to deploy your app are minimal. Add this to your Gemfile.

Gemfile

    gem "jets", ">= 6.0"
    gem "jets-rails", ">= 1.0"

And run

    jets init
    jets deploy

That's it.
