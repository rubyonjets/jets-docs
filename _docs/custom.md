---
title: Custom Resources
category: top-level
subcategory: custom
order: 15
---

You can create any custom AWS resources with Jets as a first-class citizen.  There are 2 types of custom resources:

1. **Associated Function Resources**: You define these resources above your methods. They are associated with the Lambda function below it.
2. **Shared Resources**: You define these resources in the `shared/resources` folder. They are standalone resources.

The custom resources are added to the generated AWS CloudFormation templates as part of the build process. The next sections provide an introduction to the core resource modeling behind Jets and examples of the custom resources.

