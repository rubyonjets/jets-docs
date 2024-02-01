docker.dockerfile.add_deploy_user | true | Add deploy user and Docker `USER deploy:deploy` instruction to near the bottom of the Dockerfile. Turning this off will mean the USER will be root. Can be useful for debugging.
docker.dockerfile.build_args.at_top | nil | Hash of vars you want Jets to use for `docker build --build-arg`. Added to the top of the Dockerfile.
docker.dockerfile.build_args.build_stage | nil | Hash of vars you want Jets to use for `docker build --build-arg`. Added to the build stage of the Dockerfile.
docker.dockerfile.build_args.deployment_stage | nil | Hash of vars you want Jets to use for `docker build --build-arg`. Added to the deployment stage of the Dockerfile.
docker.dockerfile.build_args.enable_aws_creds | false | Enables passing the CodeBuild IAM role to the docker build. This allows the commands within the docker build process to have the same AWS access level as the CodeBuild remote runner.
docker.dockerfile.install_awscli | false | Install the AWS CLI
docker.dockerfile.packages.build_stage | [] | Additional packages to install during the build Docker stage.
docker.dockerfile.packages.deployment_stage | [] | Additional packages to install during the deployment Docker stage.
docker.dockerfile.packages.installer | "apt-get" | For future use.
docker.enable | true | Enable Docker Image package for AWS Lambda.
docker.image | nil | Prebuilt Docker Image.
docker.tag | ":FRIENDLY_TAG-:TIMESTAMP-:GIT_SHA" | Docker tag format string.