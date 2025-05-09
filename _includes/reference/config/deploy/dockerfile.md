dockerfile.apt.packages.all_stages | [] | Additional apt packages to install for all Docker stages.
dockerfile.apt.packages.build_stage | [] | Additional apt packages to install during the build Docker stage.
dockerfile.apt.packages.deployment_stage | [] | Additional apt packages to install during the deployment Docker stage.
dockerfile.auto_packages | true | Jets auto-detects required packages based on gems and automatically adds them.
dockerfile.copy_for_bundle | nil | List of folders to copy before the first bundle install. String or Array of Strings. This can be useful for copying files that are needed for the bundle install. IE: An `engines` folder with a Gemfile using `path: engines/engine_name`.
dockerfile.image_package.from_base.docker_image | nil | Full image name, IE: `ruby:3.2.3-slim` Overrides other settings.
dockerfile.image_package.from_base.image_name | "ruby" | Base image name without tag.
dockerfile.image_package.from_base.image_tag | nil | Auto-detected by default. IE: `3.2.3`
dockerfile.image_package.from_base.image_variant | "slim" | Image variant.
dockerfile.image_package.from_base.ruby_version | nil | Auto-detected by default. IE: `3.2.3`
dockerfile.image_package.normalize_permissions | true | Normalize permissions for all files and directories in the Docker image. Avoids issues with Lambda not being able to read files. Can happen when Jets deploying from Heroku release phase hook.
dockerfile.yum.packages.all_stages | [] | Additional yum packages to install for all Docker stages.
dockerfile.yum.packages.build_stage | [] | Additional yum packages to install during the build Docker stage.
dockerfile.yum.packages.deployment_stage | [] | Additional yum packages to install during the deployment Docker stage
dockerfile.zip_package.from_base.docker_image | nil | Full image name, IE: `public.ecr.aws/lambda/ruby:3.2.3` Overrides other settings.
dockerfile.zip_package.from_base.image_name | "public.ecr.aws/lambda/ruby" | Base image name without tag.
dockerfile.zip_package.from_base.image_tag | nil | Auto-detected by default. IE: `3.2.3`
dockerfile.zip_package.from_base.image_variant | nil | IE: "slim". The AWS Lambda Image do not use variants.
dockerfile.zip_package.from_base.ruby_version | nil | Auto-detected by default. IE: `3.2.3`