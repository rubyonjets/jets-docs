---
title: Jobs
category: top-level
subcategory: jobs
order: 5
---

**Note**: Jets 6 Jobs are different than Jets 5 Jobs. A Jets 6 Job an Rails ActiveJob compatiable job. Jets 5 Jobs have been renamed to [Jets Events]({% link _docs/events.md %})

A Jets job handles work which is better suited to run in the background - outside of the web request/response cycle. Here's an example:

app/jobs/cleanup_job.rb:

```ruby
class CleanupJob < ApplicationJob
  def perform(*args)
    puts "Cleaning up: #{args}"
  end
end
```

To call a Job:

    $ rails console
    > CleanupJob.perform_now("desk")
    > CleanupJob.perform_later("desk")


## Links

{% assign event_docs = site.docs | where: "categories","jobs" | sort: "order" %}
{% for doc in event_docs %}
* [{{ doc.title }}]({{doc.url}}): {{ doc.desc }}{% endfor %}
