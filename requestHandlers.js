var mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'rc',
    password: 'rc',
    database: 'rconn'
});

function start(request, response) {
    response.writeHead(200);
    response.write('Hello World');
    response.end();
}

function marketplace(request, response) {
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
}

exports.start = start;
exports.marketplace = marketplace;