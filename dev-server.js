#!/usr/bin/env node

var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var proxy = require('http-proxy-middleware');
var merge = require('object-merge');
var readFile = require('fs').readFileSync;
var args = require('minimist')(process.argv.slice(2));

const FILE_EXTENSION = '.devserverrc';
const DEFAULT_FILE_NAME = '';
const DEFAULT_SERVER_PATH = './';

// args._ contains all unnamed parameters
var fileName = args._[0] || args['client'] || DEFAULT_FILE_NAME;
var serverPath = args['host'] || DEFAULT_SERVER_PATH;
var configFileName = fileName + FILE_EXTENSION;

var fullConfigPath = serverPath.charAt(serverPath.length - 1) !== '/'
    ? serverPath + '/' + configFileName
    : serverPath + configFileName

var config = {
    proxies: [],
    port: 8080,
    logLevel: 'dev',
    errorHandler: true
};

try {
    config = merge(
        config,
        JSON.parse(readFile(fullConfigPath).toString())
    );
} catch (e) {
    console.log('WARNING: No project configurations found (`' + fullConfigPath + '`).');
}

var server = connect();

if (config.errorHandler) server.use(errorHandler());
server.use(morgan(config.logLevel));

if (config.proxies && config.proxies.length > 0) {
    for (var i = 0; i < config.proxies.length; i++) {
        server.use(proxy(
            config.proxies[i].context,
            config.proxies[i].config
        ));
    }
}

server.use(serveStatic(serverPath));

http.createServer(server).listen(config.port);
