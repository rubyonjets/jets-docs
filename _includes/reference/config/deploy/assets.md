assets.build.detect_local | true | If `public/assets/manifest-*.js` is detected in the source code, Jets assumes you have locally precompiled assets and the remote runner will not attempt to compile assets in the remote runner docker build process.
assets.build.enable | "conditional" | When Rails, it's set to true. For other frameworks like sinatra, it's set to false.
assets.build.nodejs.enable | auto | The `auto` value means that it will be auto-detected. When a `package.json` is detected in the source code, it'll assume you'll need nodejs and yarn installed.
assets.build.nodejs.version | 20.12.1 | The nodejs version to use. We try to default to the latest LTS node.
assets.build.nodejs.deployment_stage | true | When is `nodejs.enable`, it will install for both build and deployment stages for the multi-stage docker build process. You can use this to disable it for the deployment phase. This means the Docker image you're running won't have access to the nodejs runtime. It's only use to build artifacts.
assets.build.precompile_command | "conditional" | When Rails, the default command is a jets `precompile_assets.sh`, which calls `rails assets:precompile` if it's available. Otherwise, it is `nil`.
assets.upload.cache_control | nil | The cache control header to use for assets uploaded to s3. Example: `public, max-age=3600`.
assets.upload.enable | true | Upload the assets from `assets.upload.folders`, IE: public, to s3.
assets.upload.folders | ["public"] | Folders to upload to s3.
assets.upload.max_age | 3600 | The max age in seconds for the cache control header. This is a shorter way to set the cache_control. IE: `3600` => `public, max-age=3600`