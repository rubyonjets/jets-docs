---
title: DynamoDB Dynomite Local Server
nav_text: Local
category: dynamodb-other
order: 6
---

DynamoDB Local can be useful for development.  It's like using a local SQL server instead of a remote RDS server. It can save money and be faster for development purposes. It's handy for testing like rspec.

DynamoDB Local is simply a jar file you download and run. It takes about 5 minutes to set up.

## Related Links

* [Running rspec over dynomite model with local dynamodb instance results in MissingCredentialsError](https://community.rubyonjets.com/t/running-rspec-over-dynomite-model-with-local-dynamodb-instance-results-in-missingcredentialserror/31/3)

## Install

On MacOSX, its dirt simple:

    brew cask install dynamodb-local
    dynamodb-local

dynamodb-local is now running on port 8000.

## Configure

To tell your Jets app to use dynamodb local.

config/initializers/dynomite.rb

```yaml
Dynomite.configure do |config|
  config.endpoint = "http://localhost:8000" if %w[development test].include?(Jets.env)
end
```

You should test with dynamodb-local so you are not paying for DynamoDB.

## A DynamoDB Web GUI

For MySQL, [Sequel Pro](https://www.sequelpro.com/) is super helpful: `brew cask install sequel-pro`

For PostgreSQL, [Postico](https://eggerapps.at/postico/) is great: `brew cask install postico`

For DynamoDB, the closest thing I could find is: [dynamodb-admin](https://github.com/aaronshaf/dynamodb-admin), thanks to [Aaron](https://github.com/aaronshaf). If anyone has additional client recommendations, please let me know. To start the admin:

    dynamodb-admin

You can now use [http://localhost:8001/](http://localhost:8001/) as a GUI to quickly navigate the tables. 😄

### Slight Caveat You Might Run Into

You might run into a slight issue using dynamodb-admin and dynamodb-local together. Dynamodb-local uses AWS_ACCESS_KEY_ID to namespace the local database that gets created.  Dynamodb-admin sets this to ['key'](https://github.com/aaronshaf/dynamodb-admin/blob/master/index.js#L32) by default.

So if you have your AWS_ACCESS_KEY_ID set and are using AWS_PROFILE, then the local dynamodb database won't match with dynamodb-admin and your other tools.  Found this out by poking around in `/usr/local/Caskroom/dynamodb-local/latest/`:

    $ ls /usr/local/Caskroom/dynamodb-local/latest/*.db
    /usr/local/Caskroom/dynamodb-local/latest/[reacted]_us-east-1.db /usr/local/Caskroom/dynamodb-local/latest/key_us-east-1.db

You can set this key to a key that has zero permissions.  It just matters that it matches.

TLDR: set AWS_ACCESS_KEY_ID.
