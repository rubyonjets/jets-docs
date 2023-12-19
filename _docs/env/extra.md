---
title: Jets Env Extra
nav_text: Extra
category: env
order: 3
---

Jets has the concept of extra environments. By setting `JETS_EXTRA`, you can create additional environments rapidly.

    jets deploy # first environment demo-dev
    JETS_EXTRA=beta jets deploy # creates a demo-dev-beta environment

Since AWS Lambda pricing is based on usage, these extra environments cost very little, especially if you're in the [free tier](https://aws.amazon.com/free/).

## Jets Extra

The [JETS_EXTRA]({% link _docs/env/extra.md %}) concept supports its own dotenv file.  Example:

    JETS_EXTRA=beta jets console

Loads `config/jets/env/.env.dev.beta`. This takes the highest precedence over other dotenv files.

## Blue-Green Deployments

You can use the ability to create entire applications with just a variable change to perform blue-green deployments.

1. Create another environment
2. Test it to your heart's content
3. Switch the DNS over to the new stack
4. Delete the old environment

