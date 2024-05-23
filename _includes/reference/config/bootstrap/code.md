code.copy.always_keep| ["config/jets/env"] | Always keep these files when packaging the code.zip that gets uploaded to s3 for deployment.
code.copy.always_remove| ["tmp"] | Always remove these files from the code.zip package that gets uploaded to s3 for deployment.
code.copy.strategy| auto | Automatically decide the copy strategy to use when creating the code copy. See: [Remote Code Copy]({% link _docs/remote/code.md %}).
code.copy.warn_large| true | Show a warning messaging if the code size is large.