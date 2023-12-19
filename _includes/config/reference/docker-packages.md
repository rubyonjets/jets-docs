dockerfile.apt.packages.all_stages | [] | Additional apt packages to install for all Docker stages.
dockerfile.apt.packages.build_stage | [] | Additional apt packages to install during the build Docker stage.
dockerfile.apt.packages.deployment_stage | [] | Additional apt packages to install during the deployment Docker stage.
dockerfile.auto_packages | true | Jets auto-detects required packages based on gems and automatically adds them.
dockerfile.yum.packages.all_stages | [] | Additional yum packages to install for all Docker stages.
dockerfile.yum.packages.build_stage | [] | Additional yum packages to install during the build Docker stage.
dockerfile.yum.packages.deployment_stage | [] | Additional yum packages to install during the deployment Docker stage