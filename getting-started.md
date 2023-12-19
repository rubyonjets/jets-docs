---
title: Getting Started
---

Step-by-step guides to help you get started with Jets, the Ruby Serverless Framework.

___

## Choose an option

<div class="getting-started-options">
  <div class="row">
{% assign docs = site.docs | where: "categories","learn" | sort: "order"  %}
{% for doc in docs %}
    <div class="col"><a href="{{ doc.url }}">{{ doc.nav_text }} </a></div>
{% endfor %}
  </div>
</div>
