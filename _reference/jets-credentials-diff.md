---
title: jets credentials:diff
reference: true
---

## Usage

    jets credentials:diff [options]

## Description

## Storing Encrypted Credentials in Source Control

The Jets `credentials` commands provide access to encrypted credentials,
so you can safely store access tokens, database passwords, and the like
safely inside the app without relying on a mess of ENVs.

This also allows for atomic deploys: no need to coordinate key changes
to get everything working as the keys are shipped with the code.

## Setup

Applications after Jets 5 automatically have a basic credentials file generated
that just contains the secret_key_base used by MessageVerifiers/MessageEncryptors, like the ones
signing and encrypting cookies.

For applications created prior to Jets 5, we'll automatically generate a new
credentials file in `config/credentials.yml.enc` the first time you run `bin/jets credentials:edit`.
If you didn't have a master key saved in `config/master.key`, that'll be created too.

Don't lose this master key! Put it in a password manager your team can access.
Should you lose it no one, including you, will be able to access any encrypted
credentials.

Don't commit the key! Add `config/master.key` to your source control's
ignore file. If you use Git, Jets handles this for you.

Jets also looks for the master key in `ENV["JETS_MASTER_KEY"]`, if that's easier to manage.

You could prepend that to your server's start command like this:

    JETS_MASTER_KEY="very-secret-and-secure" server.start

## Set up Git to Diff Credentials

Jets provides `bin/jets credentials:diff --enroll` to instruct Git to call
`bin/jets credentials:diff` when `git diff` is run on a credentials file.

Running the command enrolls the project such that all credentials files use the
"jets_credentials" diff driver in .gitattributes.

Additionally since Git requires the driver itself to be set up in a config file
that isn't tracked Jets automatically ensures it's configured when running
`credentials:edit`.

Otherwise each co-worker would have to run enable manually, including on each new
repo clone.

To disenroll from this feature, run `bin/jets credentials:diff --disenroll`.

## Editing Credentials

This will open a temporary file in `$EDITOR` with the decrypted contents to edit
the encrypted credentials.

When the temporary file is next saved the contents are encrypted and written to
`config/credentials.yml.enc` while the file itself is destroyed to prevent credentials
from leaking.

## Environment Specific Credentials

The `credentials` command supports passing an `--environment` option to create an
environment specific override. That override will take precedence over the
global `config/credentials.yml.enc` file when running in that environment. So:

    bin/jets credentials:edit --environment development

will create `config/credentials/development.yml.enc` with the corresponding
encryption key in `config/credentials/development.key` if the credentials file
doesn't exist.

The encryption key can also be put in `ENV["JETS_MASTER_KEY"]`, which takes
precedence over the file encryption key.

In addition to that, the default credentials lookup paths can be overridden through
`config.credentials.content_path` and `config.credentials.key_path`.

## Editor wait

For editors that fork and exit immediately, it's important to pass a wait flag,
otherwise the credentials will be saved immediately with no chance to edit.

    EDITOR="code --wait" jets credentials:edit

## Accessing in App

Let's say you have credentials like so:

    ❯ jets credentials:show
    secret_key_base: somesecretvalue
    foo: bar

You can access them in the app like so:

    ❯ jets console
    > Jets.application.credentials.secret_key_base
    => "somesecretvalue"
    > Jets.application.credentials.foo
    => "bar"
    > Jets.application.credentials.does_not_exist
    => nil

Remember, when you deploy this to Lambda you should set the `JETS_MASTER_KEY`. You set it with [Env Files](https://rubyonjets.com/docs/env-files/). Otherwise the `Jets.application.credentials.xx` values will return `nil`.



## Options

```
    [--enroll], [--no-enroll]        # Enrolls project in credentials file diffing with `git diff`
                                     # Default: false
    [--disenroll], [--no-disenroll]  # Disenrolls project from credentials file diffing
                                     # Default: false
-e, [--environment=ENVIRONMENT]      # Specifies the environment to run this credentials under (test/dev/prod).
```

