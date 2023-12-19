If you have private gems in your Gemfile. You can use bundle env variables like `BUNDLE_GITHUB__COM` to allow access to these private repos.

This also works for other private repos with other domains. Examples:

    BUNDLE_GEM__FURY__IO
    BUNDLE_GEMS__CONTRIBSYS__COM
    BUNDLE_GITHUB__COM

## Example

Here's an example `Gemfile` with a private gem.

Gemfile

```ruby
source "https://rubygems.org"
gem "my-private-gem", github: "ORG/REPO"
```

This is the same as:

```ruby
source "https://rubygems.org"
gem "my-private-gem", git: "https://github.com/ORG/REPO"
```

{% if include.ci %}
## CI Runner

Set the CI project env var so that bundler use the `BUNDLE_GITHUB__COM` and the private

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.ci.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
  }
end
```

The CodeBuild CI project is used for continuous integration. This environment is different from the CodeBuild Remote Runner. It needs `BUNDLE_GITHUB__COM` since the CI deploy script does a `bundle install` before a `jets deploy`.

One way to help think about the CI runner is to prevent it's your local dev machine.

{% endif %}

## Remote Runner

The CodeBuild Remote Runner needs `BUNDLE_GITHUB__COM`.  You can set the env var.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
  }
end
```

The remote runner uses Docker to build your app and it's dependencies. It will pass `BUNDLE_*` env vars to the `docker build` command as build args. Something like this>

    docker build --build-arg BUNDLE_GITHUB__COM=*** ...

This allows the `bundle install` that runs within the Docker build process to download private gems.

## Security Note

You can safely use `BUNDLE_*` env variables. However, you should **not** add to your `Gemfile`. There is no need to.  Bundler's `bundle` is smart enough to use the credentials from the env variables without you explicitly adding them to your Gemfile.

In fact, if you add them to your Gemfile, even with String interpolate with `ENV["BUNDLE_GITHUB__COM"]`, the generated `Gemfile.lock` will contain the secret credential. It's a security issue. See discussion here: [GitHub: Bundler should NOT include private credentials in Gemfile.lock from source urls in Gemfile #3609](https://github.com/rubygems/bundler/issues/3609)

## Errors

If you're getting an error like this.

> Retrying `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://github.com/ORG/REPO.git /root/.rbenv/versions/3.2.2/lib/ruby/gems/3.2.0/cache/bundler/git/my-private-gem-af4c5b2bc45df74546fcc8bfda9a241ec77f1123` due to error (2/4): Bundler::Source::Git::GitCommandError Git error: command `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://github.com/ORG/REPO.git /root/.rbenv/versions/3.2.2/lib/ruby/gems/3.2.0/cache/bundler/git/my-private-gem-af4c5b2bc45df74546fcc8bfda9a241ec77f1123` in directory /root/.rbenv/versions/3.2.2/lib/ruby/gems/3.2.0/cache/bundler/git/my-private-gem-af4c5b2bc45df74546fcc8bfda9a241ec77f1123 has failed.
fatal: could not read Username for 'https://github.com': No such device or address

This probably means that your Gemfile contains a gem from a private repo and your set up is not allowing bundler permission to download gem from the repo. You can fix this with the `BUNDLE_GITHUB__COM` env variable as describe above.
