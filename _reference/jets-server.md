---
title: jets server
reference: true
---

## Usage

    jets server [options]

## Description

Runs a local server that mimics API Gateway for development

The local server for mimics API Gateway and provides a way to test your app locally without deploying to AWS.

## Examples

    $ jets server
    => bundle exec shotgun --port 8888 --host 127.0.0.1
    Jets booting up in development mode!
    == Shotgun/WEBrick on http://127.0.0.1:8888/
    [2018-08-17 05:31:33] INFO  WEBrick 1.4.2
    [2018-08-17 05:31:33] INFO  ruby 2.5.1 (2018-03-29) [x86_64-linux]
    [2018-08-17 05:31:33] INFO  WEBrick::HTTPServer#start: pid=27433 port=8888

Start up server binding to host `0.0.0.0`:

    jets server --host 0.0.0.0


## Options

```
-e, [--environment=ENVIRONMENT]              # Specifies the environment to run this server under (test/development/production).
-p, [--port=port]                            # Runs Jets on the specified port - defaults to 8888.
-b, [--binding=IP]                           # Binds Jets to the specified IP - defaults to 'localhost' in development and '0.0.0.0' in other environments'.
-c, [--config=file]                          # Uses a custom rackup configuration.
                                             # Default: config.ru
-d, [--daemon], [--no-daemon]                # Runs server as a Daemon.
                                             # Default: false
-u, [--using=name]                           # Specifies the Rack server used to run the application (thin/puma/webrick).
-P, [--pid=PID]                              # Specifies the PID file - defaults to tmp/pids/server.pid.
-C, [--dev-caching], [--no-dev-caching]      # Specifies whether to perform caching in development.
    [--early-hints], [--no-early-hints]      # Enables HTTP/2 early hints.
    [--log-to-stdout], [--no-log-to-stdout]  # Whether to log to stdout. Enabled by default in development when not daemonized.
```

