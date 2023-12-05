---
title: Jets Internationalization (I18n)
nav_text: Internationalization
category: extras
order: 17
---

This guide shows you how to set up simple internationalization with Jets.

## Summary of Files

Here's a summary of the files we'll update:

    app/controllers/application_controller.rb
    app/views/posts/index.html.erb
    config/locales/en.yml


## Setup Initializer and Locale YAML

In Jets v5, you do not have to configure an initializer. Jets Engines automatically load the `config/locales` files.

In Jets v4, you have to set up an initializer.

config/initializers/i18n.rb

"`ruby
I18n.load_path << Dir["#{Jets.root}/config/locales/*.yml"]
I18n.backend.load_translations
```

This sets up the I18n library so it knows which YAML files to load the locale translations.

## Setup Locale YAML

config/locales/en.yml

"`yaml
en:
  hello: "Hello world"

ru:
  hello: "Добро пожаловать!"
```

## Setup Controller Action Filter

Set up a `before_action` filter so that the locale is controlled with a `locale` parameter. IE: `locale=en`

app/controllers/application_controller.rb

"`ruby
class ApplicationController < Jets::Controller::Base
  around_action :switch_locale

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
```

Note: `around_action` is available in Jets v5 and above.

## Update View

Add test ERB that calls the `t` method, which is i18n aware.

app/views/posts/index.html.erb

"'erb
<p>Test i18n: <%= t 'hello' %></p>
```

Visiting http://localhost:8888/posts?locale=en you'll see something like this:

    Test i18n: Hello world

And visiting http://localhost:8888/posts?locale=ru you'll get:

    Test i18n: Добро пожаловать!

## Related

Jets Internationalization is based on Rails Internationalization. The Rails documentation is also useful:

* [Rails Internationalization (I18n) API](https://guides.rubyonrails.org/i18n.html)
