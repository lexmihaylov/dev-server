# dev-server
A simple http server with proxy capabilities.

# install
```bash
npm install -g https://github.com/lexmihaylov/dev-server.git
```

# configurations
You just need to create a `.devserverrc` file inside your project folder.

### example:
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
