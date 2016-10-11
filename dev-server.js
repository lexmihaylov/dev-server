#!/usr/bin/env node

var connect = require('connect');
var http = require('http');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var proxy = require('http-proxy-middleware');
var merge = require('object-merge');
var readFile = require('fs').readFileSync;

var serverPath = process.argv[2] || './';

var config = {
    proxies: [],
    port: 8080,
    logLevel: 'dev',
    errorHandler: true
};

try {
    config = merge(
        config,
        JSON.parse(readFile(serverPath + './.devserverrc').toString())
    );
} catch(e) {
    console.log('WARNING: No project configurations (`.devserverrc`).');
}

var server = connect();

server.use(bodyParser.urlencoded());
if(config.errorHandler) server.use(errorHandler());
server.use(morgan(config.logLevel));

if(config.proxies && config.proxies.length > 0) {
    for(var i = 0; i < config.proxies.length; i++) {
        server.use(proxy(
            config.proxies[i].context,
            config.proxies[i].config
        ));
    }
}

server.use(serveStatic(serverPath));

http.createServer(server).listen(config.port);
