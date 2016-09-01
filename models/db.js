var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var autoIncrement = require('mongoose-auto-increment');

// TODO: set env config and crap
var dbURI = 'mongodb://localhost/pickmeup';

mongoose.connect(dbURI);

autoIncrement.initialize(mongoose.connection);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
