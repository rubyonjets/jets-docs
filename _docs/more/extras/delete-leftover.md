---
title: "Jets Stack Delete Leftover"
nav_text: Delete Leftover
category: extras
order: 8
---

If you have deleted the CloudFormation stack directly without using the `jets delete` command, then the [remote runner]({% link _docs/remote.md %}) that Jets uses to delete your stack won't exist. You might have deleted your stack directly with the API or the AWS Console to end up in this state.

In this case, the Jets API deployment record remains in your Jets Account, and a Jets stack is still considered used. You can run jets delete in your project folder to delete the stack deployment record.

    cd my_project
    jets delete

Jets will redeploy a dummy bootstrap stack with the remote runner to delete the deployment record in your Jets account. The dummy stack is deleted immediately afterward.

If you do not have a project, that's fine, too. You can specify the `JETS_PROJECT` env var. Example:

    cd empty_folder
    JETS_PROJECT=demo jets delete

You can be in any folder, even an empty one.
