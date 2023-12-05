---
title: "Kingsman: Configuring Views"
nav_text: Views
category: kingsman
order: 5
---

We built Kingsman to help you quickly develop an application that uses authentication. However, we don't want to be in your way when you need to customize it.

Since Kingsman is an engine, all its views are packaged inside the gem. These views will help you get started, but after some time you may want to change them. If this is the case, you just need to invoke the following generator, and it will copy all views to your application:

    jets generate kingsman:views

If you have more than one Kingsman model in your application (such as `User` and `Admin`), you will notice that Kingsman uses the same views for all models. Fortunately, Kingsman offers an easy way to customize views. All you need to do is set `config.scoped_views = true` inside the `config/initializers/kingsman.rb` file.

After doing so, you will be able to have views based on the role like `users/sessions/new` and `admins/sessions/new`. If no view is found within the scope, Kingsman will use the default view at `kingsman/sessions/new`. You can also use the generator to generate scoped views:

    jets generate kingsman:views users

If you would like to generate only a few sets of views, like the ones for the `registerable` and `confirmable` module,
you can pass a list of views to the generator with the `-v` flag.

    jets generate kingsman:views -v registrations confirmations