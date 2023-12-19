## Controllers vs Events

You only have fine-grain control of function {{ include.type }} for Events, not Controllers. This is because each Event method is deployed as a separate discrete Lambda Function. Whereas, a single Lambda Function is deployed to handle all controller requests.
