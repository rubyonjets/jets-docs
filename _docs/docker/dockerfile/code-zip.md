---
title: Code Zip Artifcat
nav_text: code.zip
category: dockerfile
order: 4
---

The `jets deploy` process zips up your project in a `code.zip` for deployment. For the most part, the files that are not in `.gitignore` are keep. There some additional rules that are covered below.

## Always Keep

If the code is git repo, Jets generates `code.zip` artifact that respects the `.gitignore` file. All files within in the `.gitignore` are excluded from the `code.zip`. With exception to the `.config.code.always_keep` files. The default is `always_keep = ['.deploy']`.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.code.always_keep = ['.deploy'] # default
```

Hence `.deploy` the `.deploy` folder is always copied over as part of the deploy process. This allows you to `.gitignore` files like `.env*` but copy over `.deploy/.env` files to the deploy can pick up env variable values.

## Always Remove

When the project is not a git repo, then Jets uses almost the files for the `code.zip`. Some files will always be removed per:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.code.always_remove = ['tmp'] # default
```

Since jets may generate some `tmp/artifacts`, it's important to always delete tmp.
