---
title: Jets Config Helpers EC2
nav_text: EC2
category: config-helpers
order: 8
---

These helpers look up EC2 resources.

### vpc_id

Examples:

```ruby
vpc_id(name: "tag:Name", values: ["prod"])
```

### security_group_ids

Examples:

```ruby
security_group_ids("name1", "name2", vpc_id: vpc_id("prod"))
security_group_ids("lambda-#{Jets.env}", vpc_id: vpc_id("prod"))
```

## Reference

```ruby
default_subnet_ids
default_subnets
default_vpc
default_vpc_cidr
default_vpc_id
ec2
key_pair_names(filter_expression = nil)
key_pairs(filter_expression = nil)
security_group(*names)
security_group_ids(*names)
standardize_filters(*items)
subnet_ids(*names)
subnets(*names)
tag_name_filters(names)
vpc(name)
vpc_id(name)
```
