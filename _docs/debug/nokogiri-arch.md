---
title: AWS Lambda Zip Format nokogiri arch error
nav_text: Nokogiri Arch
category: debug
order: 5
---

## Nokogiri Arch Issues

The author of Nokogiri ship the gem as mostly as a precompiled binary. This helps them avoid dealing with compiling issues people may run into. See: [Faster, more reliable installation](https://nokogiri.org/tutorials/installing_nokogiri.html#faster-more-reliable-installation)

At the same time, precompiled binaries can sometimes have their own issues. Namely, on the AWS Lambda Runtime, it looks like AWS has a older version of system libraries that the newer versions of nokogiri does not use. Because of this you may get see errors about missing system libraries.

The error seems to show up sometimes as this.

> ERROR: Could not find nokogiri-1.16.4-aarch64-linux in locally installed gems

Example:

    ❯ jets exec
    Jets REPL (6.0.0.beta1). Commands will be executed on Lambda.
    Lambda function: demo-dev-controller
    Type 'help' for help, 'exit' to exit.
    $ ls
    ERROR: Could not find nokogiri-1.16.4-aarch64-linux in locally installed gems
    Stack Trace:
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/definition.rb:570:in `materialize'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/definition.rb:203:in `specs'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/definition.rb:270:in `specs_for'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/runtime.rb:18:in `setup'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler.rb:162:in `setup'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/setup.rb:26:in `block in <top (required)>'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/ui/shell.rb:159:in `with_level'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/ui/shell.rb:111:in `silence'
    /opt/ruby/gems/3.2.0/gems/bundler-2.5.4/lib/bundler/setup.rb:26:in `<top (required)>'
    <internal:/var/lang/lib/ruby/site_ruby/3.2.0/rubygems/core_ext/kernel_require.rb>:136:in `require'
    <internal:/var/lang/lib/ruby/site_ruby/3.2.0/rubygems/core_ext/kernel_require.rb>:136:in `require'
    /var/task/handlers/controller.rb:1:in `<top (required)>'
    <internal:/var/lang/lib/ruby/site_ruby/3.2.0/rubygems/core_ext/kernel_require.rb>:136:in `require'
    <internal:/var/lang/lib/ruby/site_ruby/3.2.0/rubygems/core_ext/kernel_require.rb>:136:in `require'

Essentially, the AWS Lambda Runtime does not handle nokogiri well. You'll need to use the `config.package_type = "image"` instead.

## Notes

* Jets tried using a `RUN bundle config set force_ruby_platform true` in the zip format Dockerfile but that sometimes still does not handle nokogiri loading right with the AWS Lambda runtime. It also adds an additional minute to the build times.
* Again, this is because there are old versions of system packages on the AWS Runtime that do not work with the newer versions of nokogiri.
