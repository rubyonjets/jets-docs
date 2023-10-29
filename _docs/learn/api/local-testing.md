---
title: Local Testing
search_title: Local Testing Project API
category: learn-api
order: 5
---

## Seeding Data

Let's create some seed data to help with first. Create this file:

db/seeds.rb

```ruby
2.times do |i|
  i += 1
  Post.find_or_create_by(title: "Post #{i}", body: "Body #{i}", published: true)
end
puts "Posts created"
```

Run `jets db:seed`

    ❯ jets db:seed
    Posts created

Run `jets runner` to confirm that the records were created.

    ❯ jets runner 'puts Post.count'
    2

## Start Server

You can test the API locally with `jets server`.

Example:

    ❯ jets server
    => Booting Puma
    => Jets 5.0.0 application starting in development
    => Run `jets server --help` for more startup options
    Puma starting in single mode...
    * Listening on http://127.0.0.1:8888
    Use Ctrl-C to stop

A puma web server allows you to test locally just like a normal rack app.

## Testing with Curl

We can use `curl localhost:8888/posts` to test. Here's curl with `jq` for prettier output. Here's some of the output.

**Note**: We'll filter the timestamps from the output for conciseness.

    ❯ curl -s localhost:8888/posts | jq
    [
      {
        "id": 1,
        "title": "Post 1",
        "body": "Body 1",
        "published": true
      },
      {
        "id": 2,
        "title": "Post 2",
        "body": "Body 2",
        "published": true
      }
    ]

On the jets server side, you'll see the request:

    Started GET "/posts" for 127.0.0.1 at 2023-10-28 14:09:35 +0000
    Processing PostsController#index
    Completed Status Code 200 in 0.015s
    Started GET "/posts" for 127.0.0.1 at 2023-10-28 14:09:36 +0000

### Create with Curl

Create a `data.json` file with some test data:

data.json

```json
{
  "post": {
    "title": "Post 3",
    "body": "Body 3",
    "published": true
  }
}
```

Use `curl -x POST` to create the data:

    ❯ curl -X POST --data @data.json localhost:8888/posts
    {"id":3,"title":"Post 3","body":"Body 3","published":true}

On the jets server side:

    Started POST "/posts" for 127.0.0.1 at 2023-10-28 14:17:22 +0000
    Processing PostsController#create
      Parameters: {"post":{"title":"Post 3","body":"Body 3","published":true}}
    Completed Status Code 201 in 0.017s

Use `curl` to show post.

    ❯ curl -s localhost:8888/posts/3 | jq
    {
      "id": 3,
      "title": "Post 3",
      "body": "Body 3",
      "published": true
    }

### Update with Curl

Update the `data.json` with some edits.

data.json

```json
{
  "post": {
    "title": "Post 3 Edit 1",
    "body": "Body 3",
    "published": true
  }
}
```

Use `curl -x PUT` to update the data:

    ❯ curl -X PUT --data @data.json localhost:8888/posts
    {"id":3,"title":"Post 3 Edit 1","body":"Body 3","published":true}

On the jets server side

    Processing PostsController#update
      Parameters: {"post":{"title":"Post 3 Edit 1","body":"Body 3","published":true},"id":"4"}
    Completed Status Code 200 in 0.010s

### Delete with Curl

Last, let's delete the post

    ❯ curl -X DELETE localhost:8888/posts/3
    {"deleted":true}

On the jets server side

    Started DELETE "/posts/4" for 127.0.0.1 at 2023-10-28 14:44:20 +0000
    Processing PostsController#destroy
      Parameters: {"id":"4"}
    Completed Status Code 200 in 0.015s

We can check that the post has been deleted by hitting the posts index action again.

    ❯ curl -s localhost:8888/posts | jq
    [
      {
        "id": 1,
        "title": "Post 1",
        "body": "Body 1",
        "published": true
      },
      {
        "id": 2,
        "title": "Post 2",
        "body": "Body 2",
        "published": true
      }
    ]

Next, we'll deploy the project to AWS Lambda.
