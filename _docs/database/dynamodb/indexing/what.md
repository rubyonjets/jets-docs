---
title: DynamoDB Dynomite Indexes What They Are
nav_text: What
category: dynamodb-indexes
order: 2
---

Thinking about how NoSQL database work in general and how DynamoDB charges money for creating certain types of indexes (GSIs), gives us a clue on how DynamoDB indexes work under the hood.

When you create a GSI index, it takes a while and can double the cost of storage. GSIs are essentially copies of the table. More details [Using Global Secondary Indexes in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html). It can make a lot of sense once we think about GSIs as copies of the table.

At its heart, DynamoDB is a key-value storage database. It's designed for fast write and read operations. It's almost like Memcached with additional querying features. DynamoDB items can even have a TTL and act like a cache.
