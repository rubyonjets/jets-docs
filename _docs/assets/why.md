---
title: "Why: Importmap vs Webpack"
nav_text: Why
category: assets
order: 3
---

Why is importmap preferred over webpack?

DHH covers a lot of the move away from node tools like esbuild, rollup.js, and webpack in this [blog post](https://world.hey.com/dhh/rails-7-will-have-three-great-answers-to-javascript-in-2021-8d68191b). Here are a few more notes on why I think the move was probably made.

The node and javascript toolchain and libraries move quickly. In some ways, this is great for rapid innovation. However, it can make it a horrible experience for someone who does not work on node and javascript daily basis. One of the top visited pages from the boltops/jets community forums is for [webpack issues](https://community.boltops.com/t/webpack-has-been-initialised-using-a-configuration-object-that-does-not-match-the-api-schema/118). 🤦🏻‍♂️

A npm package is upgraded every couple of months and breaks webpack backward compatible with other libraries or old configuration schema settings. Speaking from real-world experience, it's the wild west.

* I have seen schema or interfaces for configurations like `babel.config.js`, `.browserslistrc`, `config/webpacker/environment.js`, `postcss.config.js`, `config/webpacker.yml` change in breaking ways.
* Here are just some examples: [webpacker 2059](https://github.com/rails/webpacker/issues/2059), [webpacker 2202](https://github.com/rails/webpacker/issues/2202), [webpacker 2342](https://github.com/rails/webpacker/issues/2342), [jetpacker 4](https://github.com/tongueroo/jetpacker/pull/4)
* The error messages are not generally that great, particularly when webpack breaks. I have read a few javascript books Douglas Crockford JavaScript books: [JavaScript: The Good Parts](https://amzn.to/43KKSKS) and [How JavaScript Works](https://amzn.to/3KbEWDt), and David Flanagan's [JavaScript: The Definitive Guide](https://amzn.to/3rHh8RH). It's funny that the Good Parts book is very short compared to other general Javascript books. 😄
* I have also worked with both [reactjs](https://react.dev/) and [vuejs](https://vuejs.org/). I've have even released packages to npm. Albeit it's a small humble library: [@rubyonjets/ujs-compat](https://www.npmjs.com/package/@rubyonjets/ujs-compat). Generally, I found that the javascript world can still be a frustrating experience. Maybe for a node/javascript everyday developer, the error messages are more clear.
* I have found it's usually faster to treat things like a black box when there have been webpack issues. IE: Upgrade yarn, node, and regenerate the configuration files and see if that fixes issues. Sometimes have to dig deeper, and that takes a decent amount of time.
* Ultimately, there are only so many hours in a day.

The hope of importmap is that we avoid the javascript toolchain altogether. There's no need to install specific versions of node and yarn to build packages and fix issues every couple of months when a package decides to introduce compatibility issues. Instead, we can use sprockets to build assets to bypass the javascript rabbithole.
