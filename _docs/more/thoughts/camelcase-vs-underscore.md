---
title: CamelCase vs Underscore
nav_text: CamelCase
desc: Whether or not to to use CamelCase or underscore with the Jets DSL and CloudFormation underpinnings.
category: thoughts
order: 2
---

This is a tough one because CamelCase in **not** is generally not the ruby convention. It's not ruby-ish. However, there are pros and cons.

## Pros and Cons

Pros for underscore:

* **Ruby Convention**: Ruby has excellent naming conventions. I think this is one of the reasons why Ruby can be such a beautiful language. For Ruby Hash keys, typically symbols and underscores are used. It's a little bit odd to see CamelCase in Hash keys.
* **Jets DSL**: Jets provides a beautiful DSL that essentially compiles the Ruby code into CloudFormation templates to deploy AWS Cloud resources. Users are able to think in terms of Ruby. Jets does the hard work of translating it to AWS resources for you.

Pros for CamelCase:

* **Mental Translation Overhead**: Though it might be an unpopular opinion, I don't always agree that abstractions should not leak. It's nice not to spend mental energy translating between underscore and camelcase. Let the abstraction leak! ActiveRecord is an example. Suddenly, there's no cognitive overhead. That's nice.
* **Searching**: The underscore keys are transformed to CamelCase keys. This is a pain to debug since you have to search for both the underscore and CamelCase strings.

## Learnings from Lono

A lot of learnings between the benefits and drawbacks of CamelCase vs underscore also comes writing from the [Lono CloudFormation Framework](https://lono.cloud). Although, Lono is a different beast and is an easier call. Since Lono deals directly with CloudFormation, CamelCase keys belong in the interface. In the first iterations of Lono, I tried obstinately using underscore since it was the Ruby-ish way of doing things. However, I ran into the pros and cons discussed above. When I stuck to the CloudFormation CamelCase, it made things incredibly easier.

## A Balanced Compromise

It has taken those years of learning from working hands on with CloudFormation to figure out a good compromise. CamelCase is used through the **internals** of Jets v5. This makes the Jets internals clearer. Externally, the user-facing interface is still **underscore**. This is because Jets is more of a ruby-centric DSL. CloudFormation is abstracted. However, there's a compromise. Early in the Jets CloudFormation build processing, keys are CamelCase and then merged into other Hashes internally appropriately. This allows more advanced Jets users to be able to think in terms of CloudFormation with less mental overhead. This compromise provides a balance between the two worlds. It's a little bit of the best from each world.
