---
title: "Assets Serving: Webpack Guide"
nav_text: Guide
category: assets-webpack
order: 1
---

In Jets v5, webpack is deprecated in favor of [Importmap]({% link _docs/assets/importmap.md %}). This guide is kept around for reference for those who really still need to use webpack. It provides a cheatsheet and shows how to set up Webpack with Jets v5.

## Generate New Starter Project

    jets new demo

This generates a starter project with importmap instead of webpack. We'll update it to use to use webpack manually.

## Gemfile

Add the `jetpacker` gem to your Gemfile

Gemfile

```ruby
gem "sprockets-jets"
gem "jetpacker"
```

Note, you'll still need to have sprockets-jets as that is a required gem for jets.

## Create javascript

app/javascripts/packs/javascript.js

```javascript
console.log('Hello World from Webpacker')
```

## Application Layout

In the application layout change the javascript helper tag. Remove `<%= javascript_importmap_tags %>` and use `<%= javascript_pack_tag "application" %>`. Here's an example snippet.

```html
<html lang="en">
  <head>
    <meta charset="utf-8">
    <%= javascript_pack_tag "application" %>
    ...
```

## bin/webpack

Copy the [bin/webpack](https://github.com/boltops-tools/jetpacker/blob/master/lib/install/bin/webpack) and [config/webpack](https://github.com/boltops-tools/jetpacker/tree/master/lib/install/config/webpack) files to your project.

    bin/webpack
    config/webpack/development.js
    config/webpack/environment.js
    config/webpack/production.js
    config/webpack/test.js
    config/webpacker.yml

Make bin/webpack executable.

    chmod +x bin/webpack

## package.json

The package.json are the javascript node libraries that you'll need in order for `bin/webpack` to compile the assets. At the time of this writing, here's a working example.

package.json

```json
{
  "dependencies": {
    "@rails/webpacker": "5.4.4",
    "bootstrap": "5.3.2",
    "jquery": "^3.7.1"
  },
  "devDependencies": {
    "webpack-dev-server": "^4.15.1"
  },
  "private": true
}
```

This is often what breaks webpack. Since the javascript node world tends to move fast, sometimes the dependencies no longer work with each other, and they need to be updated. If that happens, try updating these dependency versions.

## Test Compilation

Running `bin/webpack` should result in something like this:

    ❯ bin/webpack
    Hash: 7902024e23370105051b
    Version: webpack 4.47.0
    Time: 218ms
    Built at: 11/27/2023 10:29:27 PM
                                        Asset       Size       Chunks                         Chunk Names
        js/application-8248dcee8bcc81ccff55.js   4.72 KiB  application  [emitted] [immutable]  application
    js/application-8248dcee8bcc81ccff55.js.map   4.51 KiB  application  [emitted] [dev]        application
                                manifest.json  364 bytes               [emitted]
    Entrypoint application = js/application-8248dcee8bcc81ccff55.js js/application-8248dcee8bcc81ccff55.js.map
    [./app/javascript/packs/application.js] 847 bytes {application} [built]

This builds a `public/packs/manifest.json` that looks something like this

    ❯ cat public/packs/manifest.json | jq
    {
        "application.js": "/packs/js/application-8248dcee8bcc81ccff55.js",
        "application.js.map": "/packs/js/application-8248dcee8bcc81ccff55.js.map",
        "entrypoints": {
            "application": {
            "js": [
                "/packs/js/application-8248dcee8bcc81ccff55.js"
            ],
            "js.map": [
                "/packs/js/application-8248dcee8bcc81ccff55.js.map"
            ]
            }
        }
    }

The assets are compiled to the `public/packs` folder. This is one of the folders `jets deploy` picks up and uploads to s3 as part of the deployment process. Jets also detects that webpack is being used and will run it as part of the deploy process. So you should set.

Note: Webpack is deprecated as of Jets v5. It may be removed in the future, and support for it will be limited for the sake of time.