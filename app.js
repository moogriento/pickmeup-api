var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors');

//seting swagger
var argv = require('minimist')(process.argv.slice(2)),
    swagger = require("swagger-node-express");

// TODO: mongodb connection, pool it.
var db = require('./models/db');

var index = require('./routes/index.js'),
    routes = require('./routes/routes.js'),
    passengers = require('./routes/passenger.js');

// express set up
var app = express();
var subpath = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

// routing config
//app.use('/', index);
app.use('/api/routes', routes);
app.use('/api/passenger', passengers);

//swagger
app.use("/v1", subpath);
swagger.setAppHandler(subpath);
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;