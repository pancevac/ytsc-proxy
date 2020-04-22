# YouTube Comment Search - proxy
Proxy for YouTube Search Comment plugin. Implemented API rate limit, logging requests and passing requests to YouTube API.

## Why
The purpose of server side implenentation is to gain more control over using YouTube API resources. Since firefox-addon 
contained YouTube API public key in source code in early versions, there is malicious usage of daily YouTube quotas which
led other users to have bad experience using add-on.
