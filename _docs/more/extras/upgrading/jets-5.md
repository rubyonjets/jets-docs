---
title: Jets 5 Upgrade Notes
subnav: Jets 5
category: extras-upgrading
order: 1
---

{% include videos/upgrade/tool.md %}

Here are some additional notes on upgrading to Jets 5.

## jets-upgrade tool

The first tip is to try the [jets-upgrade](https://github.com/rubyonjets/jets-upgrade) tool. It tries to rewrite your source code to work with Jets 5. It automates a decent amount. It also helps document what's been changed in a codified manner.

## Additional Notes

The jets-upgrade tool tries to handle these noted items below, but when the tool may fail to rewrite your code, reading through these notes and understanding them can help with your upgrade.

* config/jets/deploy.rb has a new structure. There must be a class defined in there that inherits from `Jets::Application`. It doesn't really matter what the name of the class is; it just needs to inherit from `Jets::Application.` This is because this is how Jets Engines works to register your application as an Engine.
* The default home route displaying the "Jets Welcome" page now should now point to `jets/welcome#index`. The `public/index.html` file is also removed.
* The controller action to delete records was changed from `delete` to `destroy`.
* The `destroy` action needs to use `respond_to` and provide a format for json or js for redirecting the delete action.
* Javascript has been upgraded from using jetpacker/webpacker to importmap.
* The `javascript_pack_tag` will be replaced by `javascript_include_tag`. The `stylesheet_pack_tag` will be replaced by `stylesheet_link_tag`
* Javascript files in `app/javascript/packs` will be moved to `app/javascript`
* Css files in `app/javascript/packs` will be moved to `app/assets/stylesheets`
* Node related javascript files will be removed. This includes: node_modules babel.config.js bin/webpack bin/webpack-dev-server package.json postcss.config.js yarn.lock

Again, the jets-upgrade tool will try to do all the following above. The tool may fail, though. So, reading through these additional notes can help with the upgrade.