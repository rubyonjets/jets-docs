---
title: AWS Lambda Read-Only Filesystem
nav_text: Read-Only Filesystem
category: considerations
order: 88
---

When using AWS Lambda, it's important to understand that the filesystem is read-only. This means your code or library cannot assume write access. If you need to write something, you can write it to the `/tmp` folder, though. You may have to update your code to account for this.
