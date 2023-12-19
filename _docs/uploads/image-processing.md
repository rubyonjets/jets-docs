---
title: "Jets Uploads Image Processing"
nav_text: Image Processing
category: uploads
order: 2
---

When you use ActiveStorage `.variant` helper method to create images of different sizes like so

```ruby
@photo.image.variant(resize_to_limit: [300, 300])
```

It uses an [image_processing](https://github.com/janko/image_processing) gem underneath-the-hood.

## System Package Dependencies

The [image_processing](https://github.com/janko/image_processing) gem requires the `imagemagick` or `libvips` system package to be installed. Jets detects will installs both packages for the Docker image when it detects that you have the image_processing. You do not have to configure it.

In the future, if new libraries support is added to the image_processing gem, here's how you would add additional libraries for them.

config/jets/deploy.rb

```ruby
Jets.deploy.configure do
  config.dockerfile.apt.packages.all_stages = ["new-image-processing-package"]
end
```

## Related

* Rails 7 uses vips by default: [Rails Application Configuration Source](https://github.com/rails/rails/blob/4dbf7e33545eececd3062049007bd5845837d1f0/railties/lib/rails/application/configuration.rb#L255)
* PR: [Make vips the default variant processor for new apps #42744](https://github.com/rails/rails/pull/42744)
* Related: [Upgrade Guide: ActiveStorage in Rails 6 and ImageProcessing](https://bloggie.io/@kinopyo/upgrade-guide-active-storage-in-rails-6) and [Getting vips to work with Rails on Heroku](https://tosbourn.com/vips-rails-7-heroku/)
* If the system libraries were not installed you would get this MiniMagick::Error (You must have ImageMagick or GraphicsMagick installed)

## ActiveStorage Background Processing

ActiveStorage processing work handling is handled by different [ActiveStorage Active Jobs](https://github.com/rails/rails/tree/main/activestorage/app/jobs/active_storage). The default `Rails.application.config.active_job.queue_adapter` is `async` which should only be used for dev/test.When you configure the `config.active_job.queue_adapter` to `:jets_job`

{% include job/enable.md %}

Related: [Jets Jobs Enable]({% link _docs/jobs/enable.md %}).
