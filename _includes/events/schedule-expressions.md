You can use [cron-like expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html)

    cron(0 12 * * ? *)            # runs every day at 12:00pm UTC
    cron(5,35 14 * * ? *)         # runs every day, at 2:05pm and 2:35pm UTC
    cron(15 10 ? * 6L 2019-2022)  # runs at 10:15am UTC on the last Friday of
                                  # each month during the years 2019 to 2022

** Note **: The [AWS Cron] (https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html) syntax is slightly different from the Linux cron syntax. The AWS Cron format has six required fields, which is slightly different from the traditional Linux cron format, which has five fields. There's also a `?` notation, which means any day of the month.

You can also use [rate expresions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rate-expressions.html)

    rate(1 minute)
    rate(5 minutes)
    rate(1 hour)
    rate(1 day)

**Note**: Notice the singular 1 minute vs plural 5 minutes.

Jets 6 and above also uses [fugit](https://github.com/floraison/fugit) internally to allow user-friendly expressions like `5m` to `5 minutes`.
