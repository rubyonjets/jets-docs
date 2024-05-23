dotenv.ssm.autoload.default_skip | see desc | Default skip values for SSM autoloading. Default: `["BASIC_AUTH_USERNAME", "BASIC_AUTH_PASSWORD", "BASIC_AUTH_CREDENTIALS"]`
dotenv.ssm.autoload.enable | true | Autoload SSM values from conventional path. IE: `/demo/dev/`
dotenv.ssm.autoload.skip | [] | Skip these values for SSM autoloading.
dotenv.ssm.convention_resolver | nil | A proc that receives `ssm_leaf_value` as the argument. You can use this to customize the SSM name conventional resolver.
dotenv.ssm.long_env | false | Useful for legacy Jets 5 behavior, where JETS_ENV was encouraged to be `development` or `production`. Jets 6 uses `dev` and `prod`.
dotenv.ssm.envs.unique | ["dev","prod"] | The unique env values that should resolve to the SSM env name. So the cases when JETS_ENV is the same as SSM env name.
dotenv.ssm.envs.fallback | ["dev"] | When JETS_ENV is not one of the `ssm.envs.unique` envs, then fall back and use this env. IE: `JETS_ENV=sandbox` resolves to `dev` for the SSM env name.
dotenv.ssm.project_name | nil | Override the ssm project name. When not set, defaults to project name set by `config.name` in `config/jets/project.rb`.