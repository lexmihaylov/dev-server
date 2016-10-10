# dev-server
A simple http server with proxy capabilities.

# configurations
You just need to create a `.devserverrc` file inside your project folder.

```json
{
    "proxies": [
        {
            "context": "/api",
            "config": {
                "target": "http://example.com",
                "changeOrigin": true
            }
        }
    ],
    "port": 8080,
    "logLevel": "dev",
    "errorHandler": true
}
```