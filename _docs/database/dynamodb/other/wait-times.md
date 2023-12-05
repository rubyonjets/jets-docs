---
title: DynamoDB Dynomite Wait Times
nav_text: Wait Times
category: dynamodb-other
order: 5
---

Here are some example wait times. Times may differ for you, but it should give you an idea of how long you should wait.

Action | Time | Description
---|---|---
create_table | 10s | Time it takes to create a new table without LSI or GSI indexes. I've noticed that multiple LSI and GSI indexes only add about 10 more seconds in total.
update_table | 7m37s | Time it takes to add a GSI. This is the slowest operation. It takes a few minutes even if the table is empty. I've seen it take 5m to 10m on a pretty much empty table. The trick is to create the GSI index as part of create_table instead if you can do some planning ahead of time.
delete_table | 1s | Time it takes to delete a table.
