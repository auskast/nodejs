/*jslint white: true, maxerr: 50, indent: 4, nomen: true, vars: true, sloppy: true*/
var server = require('./server');
var router = require('./router');

server.start(router.route);
