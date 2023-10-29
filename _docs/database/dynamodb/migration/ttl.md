---
title: DynamoDB Dynomite Migrations Time to Live
nav_text: TTL
category: migration
order: 6
---

Here's a migration example that enables time to live.

```ruby
class UpdatePosts < Dynomite::Migration
  def up
    update_time_to_live(:posts, enabled: true, attribute_name: "ttl")
  end
end
```
