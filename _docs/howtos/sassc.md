---
title: Jets Howto Use SASS
nav_text: SASS
category: howtos
order: 3
---

It's pretty easy to use SASS with your stylesheets.

## Add Gem

Add the sassc gem to your Gemfile.

Gemfile

```
gem "sassc"
```

## Example Structure

Rename your `css` files to use the `scss` extension. Here's a simple example structure:

    app/assets/stylesheets/application.scss
    app/assets/stylesheets/sass/variables.scss
    app/assets/stylesheets/sass/theme.scss

You can import the sass files from the top-level `application.scss`

app/assets/stylesheets/application.scss

```sass
@import "./sass/variables";
@import "./sass/theme";
```

## Deployment

Jets will automatically use assets:precompile to compile and upload the files to s3 and serve the stylesheets from there as part of `jets deploy`.
