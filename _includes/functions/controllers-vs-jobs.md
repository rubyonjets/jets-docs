## Controllers vs Jobs

You only have fine-grain control of function {{ include.type }} for Jobs, not Controllers. This is because each Job method is deployed as a separate discrete Lambda Function. Whereas, a single Lambda Function is deployed for all controllers.
