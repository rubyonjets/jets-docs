---
title: Code Zip Artifact
nav_text: Code Zip
category: dockerfile
order: 8
---

The `jets deploy` process zips up your project in a `code.zip` for deployment. For the most part, the files that are not in `.gitignore` are packaged up. Some additional rules are covered below.

## Always Keep

If the code is git repo, Jets generates `code.zip` artifact that respects the `.gitignore` file. All files within in the `.gitignore` are excluded from the `code.zip`. With exception to the `.config.code.always_keep` files. The default is `always_keep = ['config/jets/env']`.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
 config.code.always_keep = ['config/jets/env'] # default
```

Hence, the `config/jets/env` folder is always copied over as part of the deployment process. This allows you to `.gitignore` files like `.env*` but copy over `config/jets/env/.env` files so the remote runner use the `config/jets/env` variable values.

## Always Remove

When the project is not a git repo, then Jets uses almost all the files for the `code.zip`. Some files will always be removed per:

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
 config.code.always_remove = ['tmp'] # default
```

{% include ci/gitignore.md %}
