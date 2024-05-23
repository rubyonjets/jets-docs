---
title: "Assets Nodejs"
nav_text: Nodejs
category: assets
order: 5
---

Jets can build a Docker image with the Nodejs runtime installed for apps that need it. For Rails, Nodejs is typically useful for compiling assets that use Node ecocystem libraries.

## Install NodeJS

The default `config.assets.build.nodejs.enable = "auto"` means Jets will auto-detect whether or not to install NodeJS.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.assets.build.enable = true
 config.assets.build.nodejs.enable = "auto"
 # config.assets.build.nodejs.version = "20.12.1" # default a stable nodejs version
end
```

When a `package.json` or `yarn.lock` is detected in the source code, Jets will install nodejs and yarn.

## Node Version Precedence

Jets auto-detects what Nodejs version to install for the Docker image it builds. The auto-detection precedence works in this order:

1. config
2. .tool-versions or .nvmrc
3. default

It's recommended to use #2 .tools-version or .nvmrc

### config

You can configure the NodeJS version to use with a config. It takes the highest precedence.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
 config.assets.build.nodejs.version = "20.12.2"
end
```

### Gemfile

Jets will evaluate the `Gemfile` and use the NodeJS version if there's a specified `ruby` version.

Gemfile

```ruby
ruby "20.12.2"
```

### .tool-versions or .nvmrc

If your project has a `.tool-versions` ([asdf](https://github.com/asdf-vm/asdf)) or `.nvmrc`, Jets installs that version. If both `.tool-versions` and `.nvmrc` exist, the `.tool-versions` takes higher precedence.

### default

The Jets default NodeJS version may change in the future. See "NodeJS Version Default" below.

## NodeJS Version Default

Jets installs a version of nodejs that we feel is stable. This may mean that the default version is different from the latest LTS version. We cannot guarantee the default version won't change. The reasons for this are elaborated below.

The NodeJS world tends to move quickly. In some ways, this is great for rapid innovation. However, it can make it a tough experience for someone who does not work on node and javascript on a daily basis. One of the top visited pages from the boltops/jets community forums is for [webpack issues](https://community.boltops.com/t/webpack-has-been-initialised-using-a-configuration-object-that-does-not-match-the-api-schema/118). 🤦🏻‍♂️

It seems like some npm package is upgraded every couple of months, which happens to break backward compatibility with other libraries or old configuration schema settings. Speaking from real-world experience, it's the Wild West.

* Over the years, schema or interfaces for configurations like `babel.config.js`, `.browserslistrc`, `config/webpacker/environment.js`, `postcss.config.js`, `config/webpacker.yml` change in breaking ways.
* Here are just some examples: [webpacker 2059](https://github.com/rails/webpacker/issues/2059), [webpacker 2202](https://github.com/rails/webpacker/issues/2202), [webpacker 2342](https://github.com/rails/webpacker/issues/2342), [jetpacker 4](https://github.com/tongueroo/jetpacker/pull/4), [digital envelope routines::unsupported Error](https://gist.github.com/tongueroo/d56e29daca48b0c3913c36352b876fa9).
* The error messages could be better, particularly when webpack breaks. I have read a few javascript books Douglas Crockford JavaScript books: [JavaScript: The Good Parts](https://amzn.to/43KKSKS) and [How JavaScript Works](https://amzn.to/3KbEWDt), and David Flanagan's [JavaScript: The Definitive Guide](https://amzn.to/3rHh8RH). It's funny that the Good Parts book is short compared to other general Javascript books. 😄
* I have also worked with both [reactjs](https://react.dev/) and [vuejs](https://vuejs.org/). I've even released packages for npm. Albeit it's a small humble library: [@rubyonjets/ujs-compat](https://www.npmjs.com/package/@rubyonjets/ujs-compat). Generally, I found that the JavaScript world can still be a frustrating experience. The error messages may be clearer for a node/javascript everyday developer.
* I have found it's usually faster to treat things like a black box when there have been webpack issues. IE: Upgrade yarn and node, regenerate the configuration files, and see if that fixes issues. Sometimes, you have to dig deeper, and that takes a decent amount of time.
* DHH also discusses the move away from node tools like esbuild, rollup.js, and webpack in this [Rails 7 will have three great answers to JavaScript in 2021+](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b).
* Ultimately, there are only so many hours in a day.

Thus, we may change the default node version more liberally than other components. If you need specific versions, you should explicitly set them. You can also precompile your assets locally and add them to git before deployment.


{% include reference/config/header.md %}
{% include reference/config/deploy/assets.md %}
{% include reference/config/footer.md %}

