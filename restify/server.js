var restify = require('restify');

var server = restify.createServer({
    name: 'Patrick Test'
});

server.pre(restify.pre.userAgentConnection());
server.pre(restify.pre.sanitizePath());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.authorizationParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// Buyer
var buyers = {};

function createBuyer(request, response, next) {
    console.log('create buyer');
    var buyer = request.body;

    buyer.id = Math.random().toString(36).substr(3, 8);
    buyers[buyer.id] = buyer;
    response.json(201, buyer);
    return next();
}

function updateBuyer(request, response, next) {
    console.log('update buyer');
    var id = request.params.id,
        buyer = request.body;

    if (!id) {
        return next(new restify.MissingParameterError('Must provide an id.'));
    } else if (!buyers[id]) {
        return next(new restify.NotFoundError('That buyer does not exist.'));
    }

    buyers[id] = buyer;
    response.json(202, buyer);
    return next();
}

function getBuyer(request, response, next) {
    console.log('get buyer');
    var id = request.params.id;

    if (id) {
        if (buyers[id]) {
            response.json(200, buyers[id]);
            return next();
        } else {
            return next(new restify.NotFoundError('That buyer does not exist.'));
        }
    }

    var buyer, result = [];
    for (buyer in buyers) {
        result.push(buyers[buyer]);
    }
    response.json(result);
    return next();
}

function deleteBuyer(request, response, next) {
    console.log('delete buyer');
    var id = request.params.id;

    if (!id) {
        return next(new restify.MissingParameterError('Must provide an id.'));
    } else if (!buyers[id]) {
        return next(new restify.NotFoundError('That buyer does not exist.'));
    }

    var result = {};
    for(buyer in buyers) {
        if (buyer !== id) {
            result[buyer] = buyers[buyer];
        }
    }
    buyers = result;
    response.send(204);
    return next();
}

server.post('/buyer/services/buyers', createBuyer);
server.put('/buyer/services/buyers/:id', updateBuyer);
server.get('/buyer/services/buyers', getBuyer);
server.head('/buyer/services/buyers', getBuyer);
server.get('/buyer/services/buyers/:id', getBuyer);
server.del('/buyer/services/buyers/:id', deleteBuyer);

server.get('/', function root(request, response, next) {
    var routes = [
        'GET    /',
        'POST   /buyer/services/buyers',
        'PUT    /buyer/services/buyers/:id',
        'GET    /buyer/services/buyers',
        'GET    /buyer/services/buyers/:id',
        'DELETE /buyer/services/buyers/:id'
    ];
    response.send(200, routes);
    return next();
});

server.listen(8888, function() {
    console.log('%s listening at %s', server.name, server.url);
});