---
title: DynamoDB Dynomite Result Paging
nav_text: Paging
category: dynamodb-other
order: 1
---

A common way to iterate through posts is:

```ruby
Post.each do |post|
  # do something
end
```

## Paging

If you need to access each page of results:

```ruby
Post.each_page do |page|
  page.each do |post|
    # do something
  end
end
```

You can specify conditions for the pages:

```ruby
Post.where(category: "Cloud").each_page do |page|
  page.each do |post|
    # do something
  end
end
```

If you need a page index, you can do this:

```ruby
Post.each_page.with_index do |page, index|
  page_number = index + 1
  page.each do |post|
    puts "page_number: #{page_number}"
    # do something
  end
end
```

Also, `each_page` and `pages` are aliases. Either works.

## Raw Response Page

Sometimes you may need direct access to the raw response page from the AWS DynamoDB API. You can access it with `raw_pages` or `each_raw_page`. This allows you to grab the `response.last_evaluated_key` and use it for additional requests.

Here's a controller example that can help implement pagination for a web app.

```ruby
class PostsController < ApplicationController
  def index
    primary_key = params[:next_token] ? JSON.parse(Base64.decode64(params[:next_token])) : nil
    response, items = Post.start_at(primary_key).raw_pages.first

    render json: {
      items: items,
      next_token: Base64.encode64(response.last_evaluated_key.to_json)
    }
  end
end
```

`raw_pages` return a Lazy Enumerator that contains a 2-level array. It looks something like this:

```ruby
[
  [
    #<struct Aws::DynamoDB::Types::ScanOutput items=[{"id"=>"post-1", "title"=>"post 1"},{"id"=>"post-2", "title"=>"post 2"},count=2,scanned_count=2,last_evaluated_key=nil> ],
    [#<Post:0x00007f3ed7872180>, #<Post:0x00007f3ed7872068>]
  ],
  [
    #<struct Aws::DynamoDB::Types::ScanOutput items=[{"id"=>"post-4", "title"=>"post 4"},{"id"=>"post-4", "title"=>"post 4"},count=2,scanned_count=2,last_evaluated_key=nil> ],
    [#<Post:0x00007f3ed7872900>, #<Post:0x00007f3ed7872ae0>]
  ],
  ...
]
```


The 1st element of each array is the RAW API response, the 2nd element of each array are the model objects.  You can use the `response.last_evaluated_key` to start the next page of posts.

## Limit

Dynomite will paginate through all DynamoDB API response pages until no more pages are left. This ensures that all records or items are loaded. To limit the data, you can use `limit`.

```ruby
Post.limit(100).each do |post|
  # do something
end
```

Dynomite will continue querying the API in paged responses until the limit is reached and there are no more records. More docs: [Query Limit]({% link _docs/database/dynamodb/querying/limit.md %}).
