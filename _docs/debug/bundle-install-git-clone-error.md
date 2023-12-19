---
title: Git Clone Debug
nav_text: Git Clone
category: debug
order: 6
---

If you're getting a `git clone` error when trying to clone a private repo.  This probably means the `BUNDLE_GITHUB__COM` is incorrect.

Here's example of an error like this.

    #18 [build  6/11] COPY Gemfile Gemfile.lock ./
    #18 DONE 0.1s

    #19 [build  7/11] RUN bundle install
    #19 1.557 Fetching gem metadata from https://rubygems.org/.........
    #19 3.259 Fetching https://github.com/org/private-repo.git
    #19 3.675
    #19 3.676 Retrying `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://***@github.com/org/private-repo.git /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455` due to error (2/4): Bundler::Source::Git::GitCommandError Git error: command `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://***@github.com/org/private-repo.git /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455` in directory /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455 has failed.
    #19 3.676 remote: Repository not found.
    #19 3.676 fatal: repository 'https://github.com/org/private-repo.git/' not found
    #19 4.001 Retrying `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://***@github.com/org/private-repo.git /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455` due to error (3/4): Bundler::Source::Git::GitCommandError Git error: command `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://***@github.com/org/private-repo.git /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455` in directory /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455 has failed.
    #19 4.001 remote: Repository not found.
    #19 4.001 fatal: repository 'https://github.com/org/private-repo.git/' not found
    #19 4.001
    #19 4.291
    #19 4.294 Retrying `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://***@github.com/org/private-repo.git /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455` due to error (4/4): Bundler::Source::Git::GitCommandError Git error: command `git clone --bare --no-hardlinks --quiet --no-tags --depth 1 --single-branch -- https://***@github.com/org/private-repo.git /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455` in directory /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455 has failed.
    #19 4.294 remote: Repository not found.
    #19 4.294 fatal: repository 'https://github.com/org/private-repo.git/' not found
    #19 4.580
    #19 4.608 Git error: command `git clone --bare --no-hardlinks --quiet --no-tags --depth 1
    #19 4.608 --single-branch --
    #19 4.608 https://***@github.com/org/private-repo.git
    #19 4.608 /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455`
    #19 4.608 in directory
    #19 4.608 /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455
    #19 4.608 has failed.
    #19 4.608 remote: Repository not found.
    #19 4.608 fatal: repository 'https://github.com/org/private-repo.git/' not found
    #19 ERROR: process "/bin/sh -c bundle install" did not complete successfully: exit code: 11
    ------
    > [build  7/11] RUN bundle install:
    4.580
    4.608 Git error: command `git clone --bare --no-hardlinks --quiet --no-tags --depth 1
    4.608 --single-branch --
    4.608 https://***@github.com/org/private-repo.git
    4.608 /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455`
    4.608 in directory
    4.608 /usr/local/bundle/ruby/3.2.0/cache/bundler/git/private-repo-50fd126a1e3c214eeae71f252c3bbaa0b96a7455
    4.608 has failed.
    4.608 remote: Repository not found.
    4.608 fatal: repository 'https://github.com/org/private-repo.git/' not found
    ------
    Dockerfile:43
    --------------------
      41 |     RUN gem install bundler --no-document
      42 |     COPY Gemfile Gemfile.lock ./
      43 | >>> RUN bundle install
      44 |
      45 |     # Copy application code
    --------------------
    ERROR: failed to solve: process "/bin/sh -c bundle install" did not complete successfully: exit code: 11
    bundler: failed to load command: jets-remote (/codebuild/output/src2293197438/src/wrapper/vendor/bundle/ruby/3.2.0/bin/jets-remote)
    /codebuild/output/src2293197438/src/wrapper/vendor/bundle/ruby/3.2.0/bundler/gems/jets-6.0.0/lib/jets/util/sh.rb:13:in `sh': Command failed: docker build --build-arg BUNDLE_GITHUB__COM=*** --build-arg JETS_ASSET_HOST=https://demo-prod-s3bucket-dvajds90zqtr.s3.us-west-2.amazonaws.com/jets/public --build-arg AWS_ACCESS_KEY_ID=$(cat /t/a | jq -r .AWS_ACCESS_KEY_ID) --build-arg AWS_SECRET_ACCESS_KEY=$(cat /t/a | jq -r .AWS_SECRET_ACCESS_KEY) --build-arg AWS_SESSION_TOKEN=$(cat /t/a | jq -r .AWS_SESSION_TOKEN) --build-arg AWS_REGION=$(cat /t/a | jq -r .AWS_REGION) -t demo-prod . (Jets::Error)
    /codebuild/output/src2293197438/src/wrapper/vendor/bundle/ruby/3.2.0/bundler/gems/jets-6.0.0/lib/jets/util/sh.rb:29:in `quiet_sh'

## To resolve the issue

* Make sure the `BUNDLE_GITHUB__COM` is correct
* Make sure that the GitHub user that the token belongs to has access.
