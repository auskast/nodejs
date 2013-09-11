var express = require('express');

var app = express();

// Configuration
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

// Routes
app.get('/', function (req, res) {
    return res.send('DSP API is running');
});
app.get('/foo/activity/deals/ping', function (req, res) {
    return res.send(req.url);
});
app.post('/foo/activity/deals/ping', function (req, res) {
    console.log(req.body.id);
    console.log(req.body.token);
    console.log(req.body.href);
    return res.send(req.body);
});

// Startup
var port = 4711;
app.listen(port, function () {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
