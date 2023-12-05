---
title: CloudFormation Many API Routes Thoughts
nav_text: Many Routes?
desc: Whether or not to collapse the number of APIGW routes down to just a proxy route or create many APIGW Resources and Methods.
category: thoughts
order: 2
---

Jets v5 reduces the number APIGW Resources and Methods deployed by collapsing essentially one APIGW proxy route.

Believe that most apps, IE: More than 80% of apps do not care about APIGW features. Most want a routing engine that is as close to the Rails routing engine as possible. By aiming for this, Jets v5 was able to get around [APIGW limitations]({% link _docs/considerations/api-gateway.md %}) like the "Sibling Variable Limit" problem. It also made it possible to port Engines like [Kingsman]({% link _docs/auth/kingsman.md %}).
