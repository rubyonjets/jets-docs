---
title: DynamoDB Dynomite Migrations Deletion Protection Enabled
nav_text: Deletion Protection
category: migration
order: 4
---

By default, the [table deletion protection](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.Basics.html#WorkingWithTables.Basics.DeletionProtection) is enabled for only `JETS_ENV=production`. If you want to enable deletion protection, you can do it per migration or set the default config.

## Migration Deletion Protection

```ruby
class CreatePosts < Dynomite::Migration
  def up
    create_table :posts do |t|
      t.partition_key :id
      t.add_gsi :title
      t.deletion_protection_enabled true
    end
  end
end
```

## Deletion Protection Config

By default, the table deletion protection is enabled for only `JETS_ENV=production`. You can always enable it like so.

config/initializers/dynomite.rb

```ruby
Dynomite.configure do |config|
  config.migration.deletion_protection_enabled = true
end
```

## Delete Tables by Disabling Deletion Protection

To delete tables with deletion protection, you must disable it first. Here's an example:

    aws dynamodb update-table --table-name demo-dev_products --no-deletion-protection-enabled
    aws dynamodb delete-table --table-name demo-dev_products

If you're developing migrations and deleting tables, here are useful commands to remove the migration version. Replace: `20230813211911`, with your actual value.

    aws dynamodb delete-item --table-name demo-dev_schema_migrations --key '{"version":{"S":"20230813211911"}}'
