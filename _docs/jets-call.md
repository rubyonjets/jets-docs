---
title: Jets Call
---

## Remote Lambda Function

You can use `jets call` to test with the CLI. Example:

    jets call controller '{"path": "/posts"}' | jq -r '.body'

The corresponding `aws lambda` CLI commands would be:

    aws lambda invoke --function-name demo-dev-controller --payload '{"path":"/posts"}' outfile.txt
    cat outfile.txt | jq '.body'
    rm outfile.txt
    aws lambda invoke help

Here's complex example.

    jets call controller '{"path": "/posts", "queryStringParameters": {"test": 1}}' --show-logs

For example payloads, you can see: [Debugging Event Payloads]({% link _docs/debug/payloads.md %}).

More help:

    jets call help # for more info like passing the payload via a file
                   # or how to call the functions locally with --local

## Local Function

The `jets call` command supports a local testing mode with the `--local` option.  This allows you to test locally before deploying.  Here's an example:

    jets call posts-controller-index '{"test":1}' --local

For more info and `jets call` examples, check out the CLI reference: [jets call cli](http://rubyonjets.com/reference/jets-call/).
