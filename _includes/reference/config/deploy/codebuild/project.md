codebuild.project.compute_type | see docs | See Docs: [Default Compute Types]({% link _docs/remote/codebuild/compute-type.md %}#default-compute-types).
codebuild.project.env.block | [] | Environment variables from your machine that will be blocked. Block rules always win over pass rules. Can be Strings or Regexps.
codebuild.project.env.default_pass | %w[JETS_API JETS_ENV JETS_EXTRA JETS_PROJECT JETS_RESET] | Default patterns for environment variables that will be passed through from your machine to the CodeBuild remote runner. Can be Strings or Regexps.
codebuild.project.env.pass | [] | Environment variables from your machine that should be passed through to the CodeBuild env. Can be Strings or Regexps.
codebuild.project.env.vars | {} | A Hash of environment variables to set for the CodeBuild remote runner.
codebuild.project.environment | {} | A generalized enviroment Hash that gets passed to the CodeBuild project environment properties.
codebuild.project.timeout_in_minutes | 60 | CodeBuild Remote Runner timeout. You can also use `codebuild.timeout` for shorthand. It's still in minutes.