---
title: Jobs
category: top-level
subcategory: jobs
order: 7
---

**Note**: Jets 6 Jobs are different than Jets 5 Jobs. A Jets 6 Job is a Rails ActiveJob compatible job. Jets 5 Jobs have been renamed to [Jets Events]({% link _docs/events.md %})

Jets Jobs are just Rails Jobs. It's implemented as a `config.active_job.queue_adapter = :jets_job` adapter. See: [Enabling Jets Jobs]({% link _docs/jobs/enable.md %}).

Jets handles work that is better suited to run in the background - outside of the web request/response cycle. Here's an example:

app/jobs/cleanup_job.rb:

```ruby
class CleanupJob < ApplicationJob
  def perform(*args)
    puts "Cleaning up: #{args}"
  end
end
```

## Jets Job SQS Queue

When you deploy a Jets app, it'll create an SQS Queue and a `jets-queue_event-handle` Lambda function to handle the Jets jobs processing. When you call the job.

    $ rails console
    > CleanupJob.perform_later("desk")

It gets added to the SQS Queue and immediately processed by the Lambda function. You can see the work being process via the logs.

    $ jets logs -f -n jets-queue_event-handle
    Cleaning up: desk

**Tip**: If you need to remember the Lambda function name, you can use the `jets functions` command to find it.

## Links

{% assign event_docs = site.docs | where: "categories","jobs" | sort: "order" %}
{% for doc in event_docs %}
* [{{ doc.title }}]({{doc.url}}): {{ doc.desc }}{% endfor %}
