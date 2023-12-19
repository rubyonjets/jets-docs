---
title: Rails Backtrace Debug
nav_text: Rails Backtrace
category: debug
order: 6
---

By default, when there's an error, Rails only shows the backtrace lines of your application in the logs. This can make it more challenging to debug things like libraries, gems, and engines. You can remove the backtrace silencers to show all lines of the backtrace.

config/initializers/backtrace_cleaner.rb

```ruby
Rails.backtrace_cleaner.remove_silencers!
```
