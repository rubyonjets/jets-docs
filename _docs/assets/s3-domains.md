Making up some names for identifying:

1. subdomain form: https://demo-dev-s3bucket-5lfgasr90ldd.s3.us-west-2.amazonaws.com/jets/public
2. subfolder form: https://s3-us-west-2.amazonaws.com/demo-dev-s3bucket-5lfgasr90ldd/jets/public

Note: Opening them both in a browser, they both work. Opening images in browsers are normal GET requests. It's the VueJS Javascript Cross Domain, CORs, request where only the subdomain form works. Hope that helps.

However, with the subfolder form, would see a CORs error in the google chrome network inspector. This affects things like VueJS that is trying to load javascript from different domains.

Guessing that AWS configures the servers that serve the S3 objects at the root level domain with stricter rules than the subdomain. IE: subdomains allow CORs requests, and the root level doesn't :man-shrugging::skin-tone-2:  That's why ended up going with the subdomain form. In case folks us VueJS, ReactJS requests.

