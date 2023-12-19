---
title: Jets CloudWatch Centralized Logging
nav_text: CloudWatch
category: monitoring
order: 2
---

With AWS Lambda, you automatically get centralized logging built-in.

## CloudWatch Monitoring Tab

To get the Monitoring tab.

1. Go to the CloudWatch Function. IE: `demo-dev-controller`.
2. Click on the **Monitoring** Tab
3. Click on view CloudWatch Logs

**Tip**: First tart by clicking on **Search all log streams** and then drill down to the log stream of interesting by grabbing the random string identifier and searching for that. Then click on the individual log stream.

![](https://img.boltops.com/tools/jets/monitoring/cloudwatch-logs.png)

## Jets Logs

Jets provides the logs command that will take the logs from your terminal.

    jets logs -f

It's a lot easier to debug with centralized logging.
