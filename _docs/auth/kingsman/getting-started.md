---
title: "Kingsman: Getting Started"
nav_text: Getting Started
category: kingsman
order: 1
---

## Getting started

Kingsman works with Jets 5.0 onwards. Run:

    bundle add kingsman

Next, you need to run the generator:

    jets generate kingsman:install

At this point, a number of instructions will appear in the console. Among these instructions, you'll need to set up the default URL options for the Kingsman mailer in each environment. Here is a possible configuration.

config/environments/development.rb

```ruby
Jets.application.configure do
  config.action_mailer.default_url_options = { host: 'localhost', port: 8888 }
end
```

If you do not set `default_url_options` the forgot email feature will not work. An error is thrown since ActionMailer models is not be able to compute a full url.

The generator will install an initializer at `config/initializers/kingsman.rb` which describes Kingsman's configuration options. Take a look at it and adjust to your heart's content. When you are done, you are ready to add Kingsman to any of your models using the generator.

In the following command you will replace `MODEL` in `jets generate kingsman MODEL` with the class name used for the application’s users (it’s frequently `User` but could also be `Admin`). This will create a model (if one does not exist) and configure it with the default Kingsman modules.

    jets generate kingsman user

The generator also configures your `config/routes.rb` file to point to the Kingsman controller. Example:

config/routes.rb

```ruby
Jets.application.routes.draw do
  kingsman_for :users
end
```

Next, check the MODEL for any additional configuration options you might want to add, such as confirmable or lockable. If you add an option, be sure to inspect the migration file (created by the generator if your ORM supports them) and uncomment the appropriate section.  For example, if you add the confirmable option in the model, you'll need to uncomment the Confirmable section in the migration. Then run:

    jets db:migrate

You should restart your application after changing Kingsman's configuration options. Otherwise, you will run into strange errors, for example, users being unable to login and route helpers being undefined.
