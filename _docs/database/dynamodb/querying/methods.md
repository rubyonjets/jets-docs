---
title: DynamoDB Dynomite Method Reference
nav_text: Method Reference
category: dynamodb-querying
order: 88
---

## Available Methods

    and
    attribute_exists
    attribute_not_exists
    attribute_type
    average
    begins_with
    consistent
    consistent_read
    contains
    count
    delete_all
    delete_by
    destroy_all
    destroy_by
    empty?
    excluding
    exclusive_start_key
    exists?
    first
    force_scan
    ids
    index_name
    index_names
    indexes
    last
    max
    min
    not
    or
    pluck
    project
    projection_expression
    query
    scan
    scan_index_backward
    scan_index_forward
    size
    size_fn
    start_from
    sum
    warn_on_scan
    where

In case these docs become out-of-date, here's the relevant source code:

* [dynomite/item/query/read.rb](https://github.com/boltops-tools/dynomite/blob/master/lib/dynomite/item/query/read.rb)
* [dynomite/item/query/relation.rb](https://github.com/boltops-tools/dynomite/blob/master/lib/dynomite/item/query/relation.rb)
* [dynomite/item/query/relation/chain.rb](https://github.com/boltops-tools/dynomite/blob/master/lib/dynomite/item/query/relation/chain.rb)
