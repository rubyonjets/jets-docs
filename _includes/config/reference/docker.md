docker.add_deploy_user | true | Add deploy user and Docker `USER deploy:deploy` instruction to near the bottom of the Dockerfile.
docker.enable | true | Enable Docker Image package for AWS Lambda.
docker.image | nil | Prebuilt Docker Image.
docker.packages.build_stage | [] | Additional packages to install during the build Docker stage.
docker.packages.deployment_stage | [] | Additional packages to install during the deployment Docker stage.
docker.packages.installer | "apt-get" | For future use.
docker.tag | ":FRIENDLY_TAG-:TIMESTAMP-:GIT_SHA" | Docker tag format string.