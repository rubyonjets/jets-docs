---
title: Docker Tag
nav_text: Tag
category: docker
order: 7
---

You can configure the generated Docker tag with some variable substitutions. Example:

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.docker.tag = ":FRIENDLY_TAG-:TIMESTAMP-:GIT_BRANCH-:GIT_SHA-:GIT_DIRTY"
end
```

Note: Multiple sequential dashes are squished. IE: `--` => `-`.

Methods Available:

Method | Example
---|---
env | dev
friendly_tag | v1
timestamp | 2024-04-14T18-11-27Z
git_branch | main
git_sha | 04fbd83
git_dirty | dirty
