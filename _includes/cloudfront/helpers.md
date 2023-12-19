{% if include.header %}
## CloudFront Config Helpers
{% endif %}

These helpers look up CloudFront policies. You can use friendly names to lookup their IDs.

```ruby
cloudfront_cache_policy_id(policy_name)
cloudfront_origin_request_policy_id(policy_name)
cloudfront_response_header_policy_id(policy_name)
```

Example:

```ruby
Jets.deploy.configure do
  config.{{ include.config_path }}.cloudfront.enable = true
  config.{{ include.config_path }}.cloudfront.cert.arn = acm_cert_arn(domain: "example.com", region: "us-east-1")

  # Direct ID assignment
  # config.{{ include.config_path }}.cloudfront.default_cache_behavior.cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  # config.{{ include.config_path }}.cloudfront.default_cache_behavior.origin_request_policy_id = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
  # config.{{ include.config_path }}.cloudfront.default_cache_behavior.response_headers_policy_id = "60669652-455b-4ae9-85a4-c4c02393f86c"
  # Or helpers
  config.{{ include.config_path }}.cloudfront.default_cache_behavior.cache_policy_id = cloudfront_cache_policy_id("Managed-CachingOptimized")
  config.{{ include.config_path }}.cloudfront.default_cache_behavior.origin_request_policy_id = cloudfront_origin_request_policy_id("Managed-CORS-S3Origin")
  config.{{ include.config_path }}.cloudfront.default_cache_behavior.response_headers_policy_id = cloudfront_response_header_policy_id("Managed-SimpleCORS")
end
```

Note: Jets stores and lookup map to avoid the AWS API call for common policies and only makes an AWS API SDK call to get the policy id when necessary.

## CloudFront CLI Cheatsheet

Here are CLI commands to quickly get a list of available policies.

    ❯ aws cloudfront list-cache-policies | jq -r '.CachePolicyList.Items[].CachePolicy.CachePolicyConfig.Name'
    Managed-Amplify
    Managed-CachingDisabled
    Managed-CachingOptimized
    Managed-CachingOptimizedForUncompressedObjects
    Managed-Elemental-MediaPackage
    ❯ aws cloudfront list-origin-request-policies | jq -r '.OriginRequestPolicyList.Items[].OriginRequestPolicy.OriginRequestPolicyConfig.Name'
    Managed-AllViewer
    Managed-AllViewerAndCloudFrontHeaders-2022-06
    Managed-AllViewerExceptHostHeader
    Managed-CORS-CustomOrigin
    Managed-CORS-S3Origin
    Managed-Elemental-MediaTailor-PersonalizedManifests
    Managed-UserAgentRefererHeaders
    ❯ aws cloudfront list-response-headers-policies | jq -r '.ResponseHeadersPolicyList.Items[].ResponseHeadersPolicy.ResponseHeadersPolicyConfig.Name'
    Managed-CORS-and-SecurityHeadersPolicy
    Managed-CORS-With-Preflight
    Managed-CORS-with-preflight-and-SecurityHeadersPolicy
    Managed-SecurityHeadersPolicy
    Managed-SimpleCORS

**Important**: Do not use the `Managed-Amplify` policy for Lambda Function URLs. It forwards the Host header and Lambda URLs return an error when that happens.

Also, here's the AWS Docs to the policies.

* [Using the managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-cache-policies.html)
* [Using the managed origin request policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html)
* [Using the managed response headers policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html)

