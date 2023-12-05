---
title: DynamoDB Dynomite Model Magic Fields
nav_text: Magic Fields
category: dynamodb-model
order: 3
---

## Magic Fields: Timestamps

You might notice that `created_at` and `updated_at` are also available. You get these "magic fields" for free. Every dynomite model automatically will set fields `created_at` and `updated_at`.

## Magic Fields: Id

Every dynomite model also will have some automatic behavior for the id field. It will automatically be set. Example:

    $ jets console
    > Post.first.id
    => "post-A2uxLhRzIYdqWwtN"

You can also set the id field to a specific desired value:

    Post.create(id: "myid")
