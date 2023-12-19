---
title: AWS Lambda Function Timeout Error
nav_text: Function Timeout
category: debug
order: 5
---

If you're getting a error or timeout during the `init` phase of the request to the AWS Lambda.

    Executing 'handlers/controller.lambda_handler' in function directory '/app'
    INIT_REPORT Init Duration: 3250.25 ms   Phase: init     Status: error   Error Type: Runtime.ExitError
    INIT_REPORT Init Duration: 3003.83 ms   Phase: invoke   Status: timeout
    START RequestId: 6ac612a0-e087-4921-af5b-36243d4bb5ac Version: $LATEST
    2024-04-14T01:17:35.426Z 6ac612a0-e087-4921-af5b-36243d4bb5ac Task timed out after 3.05 seconds

    END RequestId: 6ac612a0-e087-4921-af5b-36243d4bb5ac
    REPORT RequestId: 6ac612a0-e087-4921-af5b-36243d4bb5ac  Duration: 3045.79 ms    Billed Duration: 3000 ms        Memory Size: 128 MB     Max Memory Used: 23 MB
    Skipped bootstraping TelemetryLog
    Executing 'handlers/controller.lambda_handler' in function directory '/app'
    INIT_REPORT Init Duration: 10007.31 ms  Phase: init     Status: timeout
    INIT_REPORT Init Duration: 3003.39 ms   Phase: invoke   Status: timeout
    START RequestId: 19b5362c-0c19-4fe6-9b90-d8ab73782141 Version: $LATEST
    2024-04-14T01:28:52.171Z 19b5362c-0c19-4fe6-9b90-d8ab73782141 Task timed out after 3.03 seconds

Here are some possible reasons:

* The Lambda Function Memory and Timeout settings is too low. Jets has some reasonable defaults for Rails apps but it depends on your Rails app.
* The `DATABASE_URL` might be misconfigured.
