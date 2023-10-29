---
title: Debugging Event Payloads
nav_text: Event Payloads
category: debug
order: 4
---

Here are examples of event payloads for a typical CRUD controller.  They help to figure out what are the minimum required keys.

### posts#index

```json
{
  "path": "/posts",
  "httpMethod": "GET",
  "headers": {
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  }
}
```

### posts#show

```json
{
  "path": "/posts/1",
  "httpMethod": "GET",
  "headers": {
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  }
}
```

### posts#new

```json
{
  "path": "/posts/new",
  "httpMethod": "GET",
  "headers": {
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  }
}
```

### posts#edit

```json
{
  "path": "/posts/edit/1",
  "httpMethod": "GET",
  "headers": {
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  }
}
```

### posts#create

```json
{
  "path": "/posts",
  "httpMethod": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  },
  "body": "{\"post\":{\"title\":\"Post 3\",\"body\":\"Body 3\",\"published\":true}}"
}
```

### posts#update

```json
{
  "path": "/posts/3",
  "httpMethod": "PUT",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  },
  "body": "{\"post\":{\"title\":\"Post 3\",\"body\":\"Body 3\",\"published\":true}}"
}
```

### posts#destroy

```json
{
  "path": "/posts/3",
  "httpMethod": "DELETE",
  "headers": {
    "Host": "foobar.execute-api.us-west-2.amazonaws.com"
  }
}
```
