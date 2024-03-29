---
title: Rails Support
category: top-level
subcategory: rails
order: 7
---

{% include rails-update.md %}

Jets supports deploying Rails applications with a few approaches that are experimental.

1. [Jets Afterburner Mode]({% link _docs/rails/afterburner.md %})
2. [Jets Mega Mode]({% link _docs/rails/megamode.md %})

## Mount Rails App?

Rails is also rack compatible, so you may wonder if you can mount a Rails app with Jets [routes mount]({% link _docs/routing/mount.md %}) support. Mounting a Rails app is not currently recommended. Some thoughts on this here: [Mounting Rails Apps]({% link _docs/rails/mount.md %})

