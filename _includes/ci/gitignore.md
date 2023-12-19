{% if include.header != false %}
## Jets CI .gitignore
{% endif %}

If you are using [Jets CI]({% link _docs/ci.md %}), then `config/jets/env` may not be in the git repo for the CI run. IE: Even `always_keep` won't work. When using CI, you have to make sure `config/jets/env` files are in version control. IE: Check GitHub and confirm it's there.

If the config/jets/env is not in version control, it's probably due to a gitignore rule.

Here is an example that allows `config/jets/env` files while ignoring `.env` at the top level.

.gitignore

    # Ignore all environment files except templates
    /.env*
    !/.env*.erb

Here's another example of ignoring all `.env` files and explicitly allowing /config/jets/env/.env

.gitignore

    # Ignore all environment files except /config/jets/env/.env
    .env*
    !/config/jets/env/*

Make sure the `!/config/jets/env/*` line is below any `.env` ignores. Otherwise, the `.env` ignore will take higher precedence.

**Important**: Ensure you do not have secret info in `config/jets/env` and only have SSM references or safe-to-commit plain text values. Another option is to store all env values in SSM parameters and not use `config/jets/env` files. CI will be able to look up the SSM parameters.