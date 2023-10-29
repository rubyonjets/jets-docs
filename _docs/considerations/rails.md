---
title: Jets and Rails Thoughts
nav_text: Rails
category: considerations
---

Jets is built with AWS Lambda and Serverless technologies in mind. Rails is built with traditional servers in mind. Both have their advantages and disadvantages. Let's discuss trade-offs.

## Rails

* **Servers**: Rails is designed to run on traditional servers. This is not necessarily a bad thing. This allows you to use many app servers like puma and optimize the server settings. People are also used to this.
* **Scale**: You manage the servers, so you manage the scaling. There are plenty of hosting providers that can help you with that. The SAAS hosting options are usually pretty low upfront. Since Heroku has removed their free tier, I don't believe there is any free Rails hosting anymore. An interesting note about scaling costs. At super high volume, running your own servers will cost less. At medium and low volume, server management costs usually not worth it.
* **Costs**: Rails is Open Source. There's no cost to use Rails thanks to Basecamp paid services, which pretty much fund Rails. 💵 In exchange, Rails gets marketing and Open Source contributions.
* **Ecosystem**: Rails has a huge ecosystem. There are many gems and plugins you get for free. IE: [Devise](https://github.com/heartcombo/devise), etc.
* **Learning**: The primary extra learning you must do is server management. Companies usually end up hiring DevOps engineers to help with it since there's a lot to learn. DevOps engineers cost money also.
* **WebSockets**: With Rails, you can run ActionCable servers with Redis to build real-time apps. It's exciting to see Rails is getting a lot better in this area.
* **X-Factor**: The Rails ecosystem is probably the biggest x-factor.

## Jets

* **Serverless**: This one of the main benefits of the Jets. You don't have to manage the servers. You worry much less about about DevOps maintenance and uptime. You're shifting that burden onto AWS and it's team. People say you give up control, but serverless technologies have come a long way. We have Lambda Layers, Custom Runtimes, and Docker Container support for customizations nowadays. Note that Jets does not yet have container support, but it will be added.
* **Scale**: At low volume, a Jets app your AWS Lambda bill will essentially be zero. At super high volume, AWS Lamba will cost more than running servers. You have to get into millions of requests before scaling costs becomes a factor. An interestingly note, `jets server` runs a puma rack server. So, if you grow to a crazy volume, you could always deploy a Jets app onto a server to save costs. 🤣
* **Costs**: Jets is Open Source, and there's no cost to use the framework. There is an optional Jets Pro service that costs money. Jets Pro provides you access pre-built binary gems. This makes deployment to AWS easier, otherwise you have to build and manage a Custom Lambda Layer with the binary gems. Jets Pro also provides a deployment dashboard. Jets Pro is optional to use, but it provides a financial means of supporting Jets development. Support is appreciated 👍
* **Ecosystem**: Jets ecosystem is small compared to Rails. [Kingsman]({% link _docs/auth/kingsman.md %}) is a port of Devise to Jets now. Overall, you'll get less free gems and plugins. With the Jets v5 release of [Engines Support]({% link _docs/engines.md %}), the ecosystem is in a better position to expand.
* **Learning**: There is a lot of complexity with Serverless technologies. The Jets framework simplifies and wraps it up nicely in CloudFormation, but there's still a learning cost. The [Jets Getting Started Learn Guides]({% link getting-started.md %}) also help.
* **WebSockets**: Jets does not yet support WebSockets.  APIGW released support for it a while back. I looked at it back then. It would require managing state with something like DynamoDB since there's no server component. Remember, Jets is Serverless, and Rails has server components like a Redis server for the Websocket state. At some point, I would like to revisit WebSockets support and add it to Jets.
* **X-Factor**: Jets allows you to use AWS Lambda without managing servers. It's probably the biggest x-factor. However, most overlook another Jets x-factor.  Jets also allow you to leverage other serverless technologies like responding to [Events]({% link _docs/events.md %}) in AWS for things like a serverless-based cron job.

Jets is a Serverless Framework designed for the Serverless world. Jets is built on top of many Rails components internally. Jets is only possible because of Rails. I love Rails, which is why I made Jets. Jets allows me to use a Rails-like framework with Serverless. 😄 Companies who are fans of Rails are usually also fans of Jets. 🎉

I think that theorizing will only get you so far. Building a small test proof-of-concept project is sometimes the fastest path to reaching a decision. Go out there and start building! A good place to start is the [Jets Getting Started Learn Guides]({% link getting-started.md %}).
