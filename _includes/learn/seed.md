## DB Migration

Let's run the create the database and run the migration.

    jets db:create db:migrate

## Seeding Data

Let's create some seed data to help with first. Create this file:

db/seeds.rb

```ruby
2.times do |i|
  i += 1
  Post.find_or_create_by(title: "Post #{i}", body: "Body #{i}", published: true)
end
puts "Posts created"
```

Run `jets db:seed`

    ❯ jets db:seed
    Posts created

Run `jets runner` to confirm that the records were created.

    ❯ jets runner 'puts Post.count'
    2

## Start Server

You can test locally with `jets server`.

Example:

    ❯ jets server
    => Booting Puma
    => Jets 5.0.0 application starting in development
    => Run `jets server --help` for more startup options
    Puma starting in single mode...
    * Listening on http://127.0.0.1:8888
    Use Ctrl-C to stop

A puma web server allows you to test locally just like a normal rack app.
