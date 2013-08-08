var http = require('http'),
    url = require('url');

function start(route) {
    function onRequest(request, response) {
        // Handle favicon
        if (request.url === '/favicon.ico') {
            response.writeHead(200, {'Content-Type': 'image/x-icon'});
            response.end();
            return;
        }

        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');

        route(pathname, request, response);
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server has started.');
}

exports.start = start;
