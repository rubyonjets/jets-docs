---
title: Jobs
category: top-level
subcategory: jobs
order: 7
---

**Note**: Jets 6 Jobs are different than Jets 5 Jobs. A Jets 6 Job is a Rails ActiveJob compatible job. Jets 5 Jobs have been renamed to [Jets Events]({% link _docs/events.md %})

Jets Jobs are just Rails Jobs. It's implemented as a `config.active_job.queue_adapter = :jets_job` adapter. See: [Enabling Jets Jobs]({% link _docs/jobs/enable.md %}).

Jobs handles work better suited to run in the background - outside of the web request/response cycle.

## Links

{% assign event_docs = site.docs | where: "categories","jobs" | sort: "order" %}
{% for doc in event_docs %}
* [{{ doc.nav_text }}]({{doc.url}}): {{ doc.desc }}{% endfor %}
