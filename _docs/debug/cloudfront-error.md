---
title: CloudFront Rails Block Hosts
nav_text: Rails Block Hosts
category: debug
order: 1
---

## HostAuthorization Error

If you're getting this Rails error when you're using CloudFront.

    START RequestId: b6614a37-2f42-4cde-87a3-c913a91583a4 Version: $LATEST
    E, [2024-04-14T03:20:33.825228 #8] ERROR -- : [ActionDispatch::HostAuthorization::DefaultResponseApp] Blocked hosts: www.example.com
    END RequestId: b6614a37-2f42-4cde-87a3-c913a91583a4
    REPORT RequestId: b6614a37-2f42-4cde-87a3-c913a91583a4  Duration: 3.45 ms       Billed Duration: 4 ms   Memory Size: 1536 MB    Max Memory Used: 347 MB

Rails 7.1+ only does a HostAuthorization check when `config.hosts` has been configured. This means that you have configured `config.hosts` but not allowed `www.example.com`.

## Solution

```ruby
module Demo
  class Application < Rails::Application
    config.hosts += [/.*\.amazonaws\.com/, /.*\.on\.aws/, "www.example.com"]
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1
```
