---
title: DynamoDB Dynomite Limits
nav_text: Limits
category: dynamodb-associations
order: 7
---

## Relationships Limits

It's important to note that both DynamoDB and document-based storage systems are better at relational databases with some things and worse at others. Relational databases traditionally implemented associations with join tables. It's a quick indexed SQL query to grab the data.

## Rough Math

With DynamoDB, all the ids are stored as a Set in a field in the same table. The ids are retrieved with either parallel `get_item` operations or `scan` with the `id.in` operation. The performance of this can become a bottleneck for sizable associations.

Also, there is a DynamoDB item size limit of 400 KB. See: [DynamoDB Item Size Limit](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ServiceQuotas.html#limits-items). If you have too many associations, it can exceed the limit. Doing some rough math. If a string character takes 4 bytes, we can store about 102,400 characters. If the foreign keys are of the form `post-JOIHBvq7bZ1JHlrU` with 21 characters, then that would mean 102,400 / 21 ~ 4800 elements. The rest of the fields need some space too. So would buffer and use half of that. This rough math says that about 2,000 relationships can be stored.

## Improvements

We will review and consider PRs with further optimizations on storing foreign keys. Here are some ideas:

Currently, the class name is also stored to make it easier to work with, but in theory, it could be removed and resurrected upon lookup. However, it would make it more difficult to debug. Hence the current implementation includes it.

Use join tables anyway. Currently, association ids are stored in the same table because of the way docuent-based databases work. However, I wonder if we should store the ids in a join table and look up the records with a `query` expression and then `get_items` in parallel. That way, the item size limit won't be a problem. The data size can grow "vertically" with the join table instead of "horizontally" with an item row. I'm guessing that document-based purists will frown at this idea. I wonder why and also if there are other suggestions to avoid the Item Size Limit issue.

## Summary

We can't simply replace traditional relational databases without hitches. That's not to say that relational databases are better, either. It depends on what is more important for your use case. Both relational databases and DynamoDB can work quite well. Also, dynomite helps improve the experience quite a bit.
