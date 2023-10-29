---
title: Secrets Credentials
desc: "Use `jets credentials:edit` command to manage credentials."
nav_text: Credentials
search_title: Secrets and Credentials
category: secrets
order: 2
---

## Credentials Essentials Guide

You can create encoded file with

    jets credentials:edit

This opens up an editor where you can add secrets to a YAML structured file. Example:

```yaml
secret_key_base: c87a343EXAMPLE
foo: bar
```

Once you save and close the file, it creates an encoded file

    config/credentials.yml.enc

You can confirm that the file was saved and see the unencrypted contents with:

    $ jets credentials:show | yq
    secret_key_base: secret_key_base: c87a343EXAMPLE
    foo: bar

To use or reference the value of the credential:

```ruby
Jets.application.credentials.foo
```

You'll see that the credential will load differently for `JETS_ENV=production` and `JETS_ENV=development`.

## Cheatsheet Commands Summary

    jets credentials:help
    jets credentials:show
    jets credentials:edit

## Editor Wait

If you're using an editor like VSCode, you'll need to tell the credentials command to wait for the editor to close the file before returning to the process and encoding the results. Here's how you do that.

    EDITOR="code --wait" jets credentials:edit

## Production vs Development Credentials

To set the credentials for production you can use the `-e production` option. Example:

    jets credentials:edit -e production
    jets credentials:show -e production

Note, using `JETS_ENV=production` does not work to set the credentials since the "environment" can be `nil`. Here are the files relevant files to help understand:

    config/credentials.yml.enc
    config/master.key

And the environment based files:

    config/credentials/development.key
    config/credentials/development.yml.enc
    config/credentials/production.key
    config/credentials/production.yml.enc

## On AWS Lambda

When the code is running on AWS Lambda, the `*.key` files like `config/master.key` will not be deployed. This is because `jets credentials:edit` automatically adds `config/master.key` to `.gitignore` and jets will not deploy files in `.gitignore`. Without the master key, the `Jets.application.credentials.foo` call will not be able to return the secret value.

Note, it is not recommended to remove it from the `.gitignore` file because you might accidentally commit it to version control. Instead, you can add the key value to the a [Env File]({% link _docs/env-files.md %}). Example:

Here's the value from the master.key.

    $ cat config/master.key
    0254c916db6e005dbc9dd8c11EXAMPLE

.env

    JETS_MASTER_KEY=0254c916db6e005dbc9dd8c11EXAMPLE
