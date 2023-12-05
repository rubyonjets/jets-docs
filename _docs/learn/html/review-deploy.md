---
title: Review Deploy
search_title: Review Deploy api
category: learn-html
order: 8
---

{% include videos/learn/getting-started/html.md %}

{% include learn/review-deploy-cloudformation.md mode="html" %}

## Testing with a Browser

It's more traditional to test with a browser. We'll go through a few examples.

To get the APIGW endpoint, you can use the `jets url` command.

    ❯ jets url
    API Gateway Endpoint: https://spsfc098x8.execute-api.us-west-2.amazonaws.com/dev

You can open up the browser and test it just like you did with [Local Testing]({% link _docs/learn/html/local-testing.md %})

The link above takes you to the homepage; you probably want to add `/posts` to the URL to see the posts index.

![](https://img.boltops.com/tools/jets/learn/html/review-deploy-browser-index.png)

Next, we'll make some updates and do more testing.
