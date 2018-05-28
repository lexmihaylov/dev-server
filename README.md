# dev-server

A simple http server with proxy capabilities.

## Getting Started

### Installation

```bash
npm install -g https://github.com/lexmihaylov/dev-server.git
```

### Configuration files

You just need to create a `.devserverrc` file inside your project folder.

#### Example

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

## Usage

### Different client configurations

Configuration file: `client1.devserverrc`

```bash
dev-server client1
```

OR

```bash
dev-server --client client1
```

### Different host

```bash
dev-server --host "./../"
```

## Supported Parameters

- `--client`
- `--host`