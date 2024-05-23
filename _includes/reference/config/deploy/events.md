events.dynamodb.table_namespace | true | Enables prefixing the table name with the `Jets.table_namespace` value. IE: table_namespace: `demo-dev`, table_name: `posts` => `demo-dev-posts`. Instead of `true`, you can set an explicit String value and that will be the prefix value.
events.dynamodb.table_namespace_separator | _ | The character to separate the table namespace and table name with.
events.s3.configure_bucket | true | Whether or not to customer the bucket with the event notification trigger.
events.s3.notification_configuration | nil | Notification configuration