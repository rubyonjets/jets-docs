---
title: CodeBuild Remote Docker Host
nav_text: Docker Host
category: remote-codebuild
order: 3
---

The AWS CodeBuild remote runner uses Docker to your app and it's dependencies. AWS CodeBuild already has Docker installed and uses a **local** docker daemon on the **same** CodeBuild machine. Since CodeBuild dynamically provisions new machines each run, docker layer caches cannot be reused.

You can speed up the AWS CodeBuild remote runner by using a **remote** instead of a **local** docker daemon. This allows the remote runner to reuse docker layers. It is a more cost-effective way to speed up the AWS CodeBuild runs than [Fleets]({% link _docs/remote/codebuild/fleet.md %}) and is one of my favorite approaches.

## Configure Remote Docker Host

To use a remote Docker host, the DOCKER_HOST env var.

Env Var | Example | Description
---|---|---
DOCKER_USER | user | Docker user. Useful to loging into DockerHub to increase the docker pull rate limit.
DOCKER_PASS | pass | Docker password. Useful to loging into DockerHub to increase the docker pull rate limit.
DOCKER_HOST | ssh://docker.myhost.com | The remote docker host. Examples: `ssh://ubuntu@docker.myhost.com` and `tcp://docker.myhost.com:2375`. When using ssh, you also need to set `JETS_SSH_KNOWN` and `JETS_SSH_KEY`.
JETS_SSH_KEY | SSM:/#{ssm_env}/JETS_SSH_KEY | The private ssh key to be added to the CodeBuild machine. This is written to `~/.ssh/id_rsa`.
JETS_SSH_KNOWN | SSM:/#{ssm_env}/JETS_SSH_KNOWN | The string to be added to CodeBuild `~/.ssh/known_hosts` file. This can be generated from `ssh-keyscan -H -t rsa docker.myhost.com`. This is required so that docker can connect via ssh. Otherwise, docker errors when trying to connect.

To protect the Docker host, you can use ssh. You also need to set `JETS_SSH_KNOWN` and `JETS_SSH_KEY` so Jets can create the necessary `~/.ssh/id_rsa` and `~/.ssh/known_hosts` on the remote runner.

## Example

Here's an example

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    DOCKER_HOST: "ssh://ubuntu@docker.myhost.com",
    JETS_SSH_KEY: "SSM:/#{ssm_env}/JETS_SSH_KEY",
    JETS_SSH_KNOWN: "SSM:/#{ssm_env}/JETS_SSH_KNOWN",
  }
end
```
## Notes

**JETS_SSH_KNOWN**

The `JETS_SSH_KNOWN` is a string added to `~/.ssh/known_hosts`. You can think of it as:

    ssh-keyscan -H -t rsa docker.myhost.com >> ~/.ssh/known_hosts

Jets does this using the environment variables.

The `SSM:` examples above use SSM reference values. This tells CodeBuild to grab the value from the SSM Parameter Store from your AWS account. This keeps secrets out of version control. The secret values are never pulled down to the client machine. Last, they are also obfuscated in the AWS CodeBuild logs.

Related: [ServerFault: Securely add a host (e.g. GitHub) to the SSH known_hosts file](https://serverfault.com/questions/856194/securely-add-a-host-e-g-github-to-the-ssh-known-hosts-file)

**CodeBuild Cache Reuse**

Note: Technically, if you start multiple CodeBuild runs close enough to each other, then AWS Codebuild uses the same machine, and the docker caches are reused. However, they must be close to each other for a minute or so. In practice, it's rare to reuse the docker cache. Additionally, you can use [CodeBuild fleets]({% link _docs/remote/codebuild/fleet.md %}), but fleets have additional costs since they are **always** running.

