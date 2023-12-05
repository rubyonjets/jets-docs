---
title: Local Testing
search_title: Local Testing Project HTML
category: learn-html
order: 5
---

{% include learn/seed.md %}

## Testing Index Listing

Test by opening [localhost:8888/posts](http://localhost:8888/posts) in a browser:

![](https://img.boltops.com/tools/jets/learn/html/local-testing-posts-index.png)

On the jets server side, you'll see the request:

    Started GET "/posts" for 127.0.0.1 at 2023-10-28 14:09:35 +0000
    Processing PostsController#index
    Completed Status Code 200 in 0.015s
    Started GET "/posts" for 127.0.0.1 at 2023-10-28 14:09:36 +0000

### Test Create

Click on new and create a new post.

![](https://img.boltops.com/tools/jets/learn/html/local-testing-posts-new.png)

On the jets server side:

    Started POST "/posts" for 127.0.0.1 at 2023-10-28 14:17:22 +0000
    Processing PostsController#create
      Parameters: {"post":{"title":"Post 3","body":"Body 3","published":true}}
    Completed Status Code 201 in 0.017s

### Test Update

Click on edit and edit an existing post.

![](https://img.boltops.com/tools/jets/learn/html/local-testing-posts-edit.png)

On the jets server side

    Processing PostsController#update
      Parameters: {"post":{"title":"Post 3 Edit 1","body":"Body 3","published":true},"id":"3"}
    Completed Status Code 200 in 0.010s

### Test Delete

Last, let's delete the post

![](https://img.boltops.com/tools/jets/learn/html/local-testing-posts-destroy.png)

On the jets server side

    Started DELETE "/posts/4" for 127.0.0.1 at 2023-10-28 14:44:20 +0000
    Processing PostsController#destroy
      Parameters: {"id":"3"}
    Completed Status Code 200 in 0.015s

Next, we'll deploy the project to AWS Lambda.
