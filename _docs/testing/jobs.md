---
title: Job Spec
nav_text: Job
category: testing
order: 2
---

Let's say you have a CoolEvent class:

```ruby
class CoolEvent < ApplicationJob
  rate "10 hours" # every 10 hours
  def dig
    {done: "digging"}
  end
end
```

## Example 1

Here's a simple example of a job spec.

spec/job/cool_event_spec.rb:

```ruby
describe CoolEvent, type: :job do
  let(:event) { {} }
  it "dig" do
    result = CoolEvent.perform_now(:dig, event)
    expect(result).to eq(done: "digging")
  end
end
```

## Example 2

If you need to mock out instance methods in your job class, you may want to use something like this:

```ruby
describe CoolEvent, type: :job do
  let(:job) { CoolEvent.new(event, context, :dig) }
  let(:event) { {} }
  let(:context) { {} }

  it "dig" do
    allow(job).to receive(:some_method) # Example of stub
    result = job.dig
    expect(result).to eq(done: "digging")
  end
end
```

