---
title: Cold Start Note
nav_text: Cold Start
category: considerations
order: 88
---

Here's an interesting cold start note:

> When it first launched I tested it with some hello-world type stuff. The numbers I had at the time was ~100-150ms cold start for a zipped python3 lambda. Same code in a container was ~700ms. Didn't matter the container size, I could put 10GB of junk files in the container and it took longer to deploy, but startup was always ~700ms from cold start -Noted 2023

* [Reddit Comment](https://www.reddit.com/r/aws/comments/z9cbw4/comment/iykj673/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

So the size of the Docker image does not affect the Lambda cold-start.
