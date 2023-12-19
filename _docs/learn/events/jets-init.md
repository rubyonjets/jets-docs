---
title: Jets Init
search_title: Events Jets Init Setup
category: learn-events
order: 2
---

To generate jets config files need to ultimately deploy the Events project to Serverless AWS Lambda, run:

    jets init

You'll see something like this:

    ❯ jets init
    This will initialize the project for Jets.

    It make changes to your project source code.

    Please make sure you have backed up and committed your changes first.

    Are you sure? (y/N) y
          create  config/jets/env/.env
          create  config/jets/bootstrap.rb
          create  config/jets/deploy.rb
          create  config/jets/project.rb

{% include learn/jets-init-files.md learn=true %}

{% include learn/jets-init-review-config.md project="events" framework="events" package_type="zip" %}
