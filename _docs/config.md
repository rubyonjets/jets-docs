---
title: Jets Config
nav_text: Config
category: top-level
subcategory: config
order: 2
---

The main config files for Jets goes in the `config/jets` folder. Here are the important ones to know.

    config/jets/project.rb
    config/jets/bootstrap.rb
    config/jets/deploy.rb

They are discussed in more details at [Jets Config: Project, Bootstrap, Deploy]({% link _docs/config/jets.md %})

{% assign docs = site.docs | where: "categories","config" | sort: "order"  %}
{% for doc in docs %}
* [{{doc.title}}]({{doc.url}}){% endfor %}
