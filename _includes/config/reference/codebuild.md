codebuild.env.block | [] | Environment variables from your machine that will be blocked. Block rules always win over pass rules.
codebuild.env.pass | [] | Environment variables from your machine that should be passed through to the CodeBuild env. You can add Strings or Regexps.
codebuild.env.pass_base | [/JETS_/, /RAILS_/, /RACK_/] | Baseline environment variables that will be passed through to the CodeBuild remote runner.
codebuild.env.vars | {} | A Hash of environment variables to set for the CodeBuild remote runner.
codebuild.environment | {} | A generalized enviroment Hash that gets passed to the CodeBuild project environment properties.
{% include config/reference/codebuild-fleet.md %}