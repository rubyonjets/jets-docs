---
title: CodeBuild Remote Code Copy
nav_text: Code
category: remote
order: 3
---

Jets creates an archive copy of your code and uploads it to s3 for deployment. Jets does it's best use whatever is in your directory working tree, respecting the `.gitignore`.  Additonally, you can customize the copy behavior.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.code.copy.strategy = "auto" # automatically decide
  # config.code.copy.strategy = "rsync"
end
```

## Copy Strategies

The default `config.code.copy.strategy = "auto"` means Jets will choose a copy strategy based on whether the project folder is a git repo and what's installed on the system.

**The Precedence**:

1. **rsync**: The current folder is a git repo and `rsync` is installed. This also requires the `zip` command.
2. **git_copy**: The current folder is a git repo, and `git` is installed but `rsync` is not.
3. **full**: Falls back to a simple full copy. IE: `cp -r`. This will larger zip archives.

With the `rsync` and `git_copy` strategies, Jets first copies the working tree to a temp folder to create the zip file. This leaves your working directory untouched.

The `rsync` is faster than the `git_copy` because rsync uses `.gitignore` from the onset to only copy what's needed.

The `git_copy` strategy must copy everything over to a temp folder first. This can include large folders like `tmp` or `node_modules,` which take much longer. Then it will use `git archive` to create the zip file. The large folders do not end up in the final zip artifact.

There is also a `git_inline` strategy that creates the zip file without copying to a temp folder. It is faster, but it can add a side-effect git commit if the working directory is dirty.

The `rsync` strategy probably the best strategy.

If you set `config.code.copy.strategy`, it overrides the default auto behavior and you can use strategies that auto does not consider.

{% include reference/config/header.md %}
{% include reference/config/deploy/remote/code-copy.md %}
{% include reference/config/footer.md %}
