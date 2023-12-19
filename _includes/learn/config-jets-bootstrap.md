The `bootstrap.rb` has configurations that loaded next for the Jets bootstrap process. The bootstrap phase is the first phase of the Jets deploy process.

config/jets/bootstrap.rb

```ruby
Jets.bootstrap.configure do
  config.codebuild.project.env.vars = {
    BUNDLE_GITHUB__COM: "SSM:/#{ssm_env}/BUNDLE_GITHUB__COM",
    DOCKER_PASS: "SSM:/#{ssm_env}/DOCKER_PASS",
    DOCKER_USER: "SSM:/#{ssm_env}/DOCKER_USER",
    # Use your own docker host
    # DOCKER_HOST: "SSM:/#{ssm_env}/DOCKER_HOST",
    # JETS_SSH_KEY: "SSM:/#{ssm_env}/JETS_SSH_KEY",
    # JETS_SSH_KNOWN: "SSM:/#{ssm_env}/JETS_SSH_KNOWN"
  }
end
```

The `ssm_env` helper returns `dev` for `JETS_ENV=dev` and `prod` for `JETS_ENV=prod`.  You should create these SSM values:

    /dev/BUNDLE_GITHUB__COM
    /dev/DOCKER_PASS
    /dev/DOCKER_USER

Environment variable `BUNDLE_GITHUB__COM` allow the jets remote process to git clone and install private gems in your Gemfile. See: [Remote Runner Private Repos](https://docs.rubyonjets.com/docs/remote/private-repos/)

The `DOCKER_PASS` and `DOCKER_USER` env vars can be use to log into docker. You should set them to log into DockerHub, so it allows DockerHub `docker pull` without running into the rate limit. For more info see: [CodeBuild Remote Docker](https://docs.rubyonjets.com/docs/remote/codebuild/docker/).

It is recommended to use your own remote Docker Host with the env var `DOCKER_HOST` to speed up builds. See: [Remote Docker Host]({% link _docs/remote/codebuild/docker-host.md %})

After `jets init`, you'll adjust `boostrap.rb`. It's not updated much afterward.

Related: [SSM CLI Cheatsheet]({% link _docs/env/ssm/cheatsheet.md %})
