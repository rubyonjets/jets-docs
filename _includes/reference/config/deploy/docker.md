docker.image | nil | Prebuilt Docker Image.
docker.tag | ":FRIENDLY_TAG-:TIMESTAMP-:GIT_SHA" | Docker tag format string.
docker.show_build_command | false | Show `docker build` command in the deploy output.
dockerfile.add_deploy_user | true | Add deploy user and Docker `USER deploy:deploy` instruction to near the bottom of the Dockerfile. Turning this off will mean the USER will be root. Can be useful for debugging.
dockerfile.build_args.at_top | nil | Hash of vars you want Jets to use for `docker build --build-arg`. Added to the top of the Dockerfile.
dockerfile.build_args.build_stage | nil | Hash of vars you want Jets to use for `docker build --build-arg`. Added to the build stage of the Dockerfile.
dockerfile.build_args.deployment_stage | nil | Hash of vars you want Jets to use for `docker build --build-arg`. Added to the deployment stage of the Dockerfile.
dockerfile.build_args.enable_aws_creds | true | Enable auto-generated build-args that pass the CodeBuild IAM role to `docker build`. This allows the commands within the docker build process to have the same AWS access level as the CodeBuild remote runner.
dockerfile.commands.bootsnap | nil | For Rails, `bundle exec bootsnap precompile app/ lib/`. For other frameworks, nil.
dockerfile.custom | false | Allows you to use your own custom Dockerfile. Note, the Dockefile must be compatiable with Jets and Lambda. You are responsible for maintaining and updating it.
dockerfile.gemfile.force_ruby_platform | false | Adds a `RUN bundle config set force_ruby_platform true` before the `bundle install` in the Gemfile. Sometimes this helps fix some gem issues. This makes `bundle install` much slower. IE: 90s vs 20s.
dockerfile.install.awscli | true | Install the AWS CLI within the `docker build`.
{% include reference/config/deploy/dockerfile.md %}