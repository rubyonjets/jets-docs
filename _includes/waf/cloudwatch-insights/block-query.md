```sql
fields @timestamp, @message, action, httpRequest.clientIp, httpRequest.uri, httpRequest.httpMethod, webaclId
| filter action = 'BLOCK'
| sort @timestamp desc
| limit 20
```
