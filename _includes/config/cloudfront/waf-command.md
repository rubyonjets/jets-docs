## Standalone Jets WAF

Jets provides a waf command to create a **standalone** WAF ACL that is decoupled from the Jets app.

    jets waf:deploy

You may want to consider creating a "shared" or "infra" project with the standalone WAF config since the WAF can to be shared by multiple projects.

Some advantages for this:

* It allows you to use the standalone WAF as a shared resource to among all your CloudFront distributions.  So if you add a WAF rule, it applies **everywhere**.
* Each WAF costs money. The WAF ACL has a $5 baseline cost and $1 per rule per ACL. A CloudFront WAF with 3 rules costs $8. Sharing a WAF can save you money.

That being said, you can configure different WAFs for each Jets app if needed.
