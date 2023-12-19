---
title: Jets Remote Runner Managed Hook Ssh
nav_text: Ssh
category: hooks-remote-managed
order: 1
---

The Jets Managed SSH Hook will:

* Create an `~/.ssh/id_rsa`
* Add an entry to `~/.ssh/known_hosts`

This allows you to run operations like `git clone` that used `git@` access and also use private gems in your `Gemfile` that have a `git@` source.

## Configure Remote Runner

Here's an example of how you configure this hook for the CodeBuild Remote Runner

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    JETS_SSH_KNOWN: "SSM:/#{ssm_env}/JETS_SSH_KNOWN",
    JETS_SSH_KEY: "SSM:/#{ssm_env}/JETS_SSH_KEY",
  }
end
```

## Configure CI Runner

Here's an example of how you configure this hook for the CodeBuild CI Runner

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.ci.env.vars = {
    JETS_SSH_KNOWN: "SSM:/#{ssm_env}/JETS_SSH_KNOWN",
    JETS_SSH_KEY: "SSM:/#{ssm_env}/JETS_SSH_KEY",
  }
end
```

{% include hooks/ssm-redacted.md %}

## SSH Known Hosts

To get the SSH Known Host value, here's are some helpful commands:

    ssh-keyscan -H -t rsa docker.myhost.com
    ssh-keyscan -H -t rsa docker.myhost.com >> ~/.ssh/known_hosts

Related: [ServerFault: Securely add a host (e.g. GitHub) to the SSH known_hosts file](https://serverfault.com/questions/856194/securely-add-a-host-e-g-github-to-the-ssh-known-hosts-file)


