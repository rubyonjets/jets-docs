---
title: Docker Support
nav_text: Docker
category: top-level
subcategory: docker
order: 7
---

Jets supports deploying your app as a Docker image. Jets automates the Docker build process and handles the heavy lifting for you.

## Advantages

* A portable and more standard deployment format.
* Increase app size allowance. Up to **10GB** images.

## Disadvantages

* You need some knowledge on Docker.
* Cold starts are longer. They can add 100s of milliseconds.

## Enable Docker

To enable docker.

```ruby
Jets.deploy.configure do
  config.docker.enable = true
end
```
