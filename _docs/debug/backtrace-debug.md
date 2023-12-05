---
title: Backtrace Debug
category: debug
order: 6
---

By default, when there's an error, Jets only shows the backtrace lines of your application in the logs.  This can make it tougher to debug things like engines and gems.

To show all lines of the backtrace including the ones in Jets framework, engines, and gems libraries you can remove the backtrace silencers.

config/initializers/backtrace_cleaner.rb

```ruby
Jets.backtrace_cleaner.remove_silencers!
```
