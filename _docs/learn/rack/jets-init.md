---
title: Jets Init
search_title: Rack Jets Init Setup
category: learn-rack
order: 3
---

To generate jets config files need to deploy the Rack project to Serverless AWS Lambda, run:

    jets init

You'll see something like this:

    ❯ jets init
    Detected Rack framework.
    This will initialize the project for Jets.

    It will make changes to your project source code.

    Please make sure you have backed up and committed your changes first.

    Are you sure? (y/N) y
        create  config/jets/bootstrap.rb
        create  config/jets/deploy.rb
        create  config/jets/project.rb

{% include learn/jets-init-files.md learn=true %}

{% include learn/jets-init-review-config.md project="rack" framework="rack" package_type="zip" %}
