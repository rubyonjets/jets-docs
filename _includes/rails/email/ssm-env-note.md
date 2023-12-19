The example above maps to an [SSM parameter]({% link _docs/env/ssm.md %}) value with `JETS_ENV=dev`, the default. If `JETS_ENV=prod` then the SSM parameter would be `/prod/demo/<NAME>`.

Also, regardless of the value of JETS_ENV, `RAILS_ENV=production` should always used.
