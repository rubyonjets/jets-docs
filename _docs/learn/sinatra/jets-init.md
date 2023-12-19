---
title: Jets Init
search_title: Sinatra Jets Init Setup
category: learn-sinatra
order: 3
---

To generate jets config files need to deploy the Sinatra project to Serverless AWS Lambda, run:

    jets init

You'll see something like this:

    ❯ jets init
    Detected Sinatra framework.
    This will initialize the project for Jets.

    It will make changes to your project source code.

    Please make sure you have backed up and committed your changes first.

    Are you sure? (y/N) y
        create  config/jets/bootstrap.rb
        create  config/jets/deploy.rb
        create  config/jets/project.rb

{% include learn/jets-init-files.md learn=true %}

{% include learn/jets-init-review-config.md project="sinatra" framework="sinatra" package_type="zip" %}
