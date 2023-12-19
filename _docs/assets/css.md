---
title: "Assets: Referencing Assets in CSS Files"
nav_text: CSS
category: assets
order: 10
---

If you need to reference precompiled assets in css files. Here's how you achieve it.

## CSS Postprocessor Directive with url

Let's say you have an image at:

    app/assets/images/bg/paper.gif

In the CSS.

```css
body {
  background: transparent url('bg/paper.gif') top left no-repeat;
}
```

The urls will be replace with the `config.asset_host` which is set to `ENV["JETS_ASSET_HOST"]`. This is nice because it'll serve from either S3 or a CDN, which is a lot faster than Lambda.

## asset_helper ERB Helper

In the CSS.

```css
body {
  background: transparent url(<%= asset_path('bg/paper.gif') %>) top left no-repeat;
}
```

## Rails Public Files Server

You can also use configure Rails to serve static content. This means the AWS Lambda function will serve the content. This is generally not recommend as S3 or a CDN is much faster at serving assets. Here's how you do it though.

config/environments/production.rb

```ruby
Rails.application.configure do
  config.public_file_server.enabled = true
end
```

In the CSS, you reference the relative URL to the website with a leading slash.

```css
body {
  background: transparent url('/bg/paper.gif') top left no-repeat;
}
```

The file would be located at

    public/bg/paper.gif

Note you also lose the advantage of a generated checksum for browser caching.

## Related Links

* [GitHub rails/sprockets: Process css files so that they get digested paths for asset files #476](https://github.com/rails/sprockets-rails/pull/476/files)
* [GitHub rails/propshaft: Add digest to valid urls in assets #7](https://github.com/rails/propshaft/pull/7)
