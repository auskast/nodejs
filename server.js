/*jslint white: true, maxerr: 50, indent: 4, nomen: true, vars: true, sloppy: true*/
var http = require('http'),
    url = require('url'),
    mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'rc',
    password: 'rc',
    database: 'rconn'
});

function start(route) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');

        route(pathname);

        connection.query('select * from marketplaces;', function(error, rows, fields) {
            if(error) {
                response.writeHead(501);
                response.write('Error executing SQL: ' + error.message);
                response.end();
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(rows));
                response.end();
            }
        });

//        response.writeHead(200, {'Content-Type': 'text/plain'});
//        response.write('Hello World');
//        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server has started.');
}

exports.start = start;
