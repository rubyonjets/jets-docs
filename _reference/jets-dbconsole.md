---
title: jets dbconsole
reference: true
---

## Usage

    jets dbconsole [options]

## Description

Starts DB REPL console

This is like running the psql command with the `config/database.yml` values and set for you.

## Example

    $ jets dbconsole
    psql (9.2.24)
    Type "help" for help.

    demo_dev=>


## Options

```
-e,   [--environment=ENVIRONMENT]                    # Specifies the environment to run this dbconsole under (test/dev/prod).
-p,   [--include-password], [--no-include-password]  # Automatically provide the password from database.yml
      [--mode=MODE]                                  # Automatically put the sqlite3 database in the specified mode (html, list, line, column).
                                                     # Possible values: html, list, line, column
      [--header], [--no-header]
--db, [--database=DATABASE]                          # Specifies the database to use.
```

