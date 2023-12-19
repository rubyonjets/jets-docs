---
title: Event Payloads
nav_text: Event Payloads
category: debug
order: 4
---

Here are examples of event payloads for some typical controller requests.  They help to figure out what are the minimum required keys.

### home

```json
{
  "version": "2.0",
  "rawPath": "/",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  }
}
```

**Note**: For Rails, you'll need the `x-forwarded-proto` and `x-forwarded-port` headers because most Rails has a middleware that checks for https on by default.

### posts#index

```json
{
  "version": "2.0",
  "rawPath": "/posts",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  }
}
```

### posts#show

```json
{
  "version": "2.0",
  "rawPath": "/posts/1",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  }
}
```

### posts#new

```json
{
  "version": "2.0",
  "rawPath": "/posts/new",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  }
}
```

### posts#edit

```json
{
  "version": "2.0",
  "rawPath": "/posts/edit/1",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  }
}
```

### posts#create

```json
{
  "version": "2.0",
  "rawPath": "/posts",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "content-type": "application/x-www-form-urlencoded",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  },
  "requestContext": {
    "http": {
      "method": "POST"
    }
  },
  "body": "{\"post\":{\"title\":\"Post 1\",\"body\":\"Body 1\",\"published\":true}}"
}
```

### posts#update

```json
{
  "version": "2.0",
  "rawPath": "/posts/1",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "content-type": "application/x-www-form-urlencoded",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  },
  "requestContext": {
    "http": {
      "method": "PUT"
    }
  },
  "body": "{\"post\":{\"title\":\"Post 1 Edit 1\",\"body\":\"Body 1\",\"published\":true}}"
}
```

### posts#destroy

```json
{
  "version": "2.0",
  "rawPath": "/posts/1",
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  },
  "requestContext": {
    "http": {
      "method": "DELETE"
    }
  }
}
```

### Cookies Example

Here's an example payload that will set cookies.

```json
{
  "version": "2.0",
  "routeKey": "$default",
  "rawPath": "/posts",
  "rawQueryString": "foo=bar",
  "cookies": [
    "yummy1=value1",
    "yummy2=value2"
  ],
  "headers": {
    "host": "dummy.lambda-url.us-west-2.on.aws",
    "x-forwarded-proto": "https",
    "x-forwarded-port": "443"
  }
}
```

## AWS Docs

For the example event format structure, check out the AWS docs: [Payload format version](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html)
