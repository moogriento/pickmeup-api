// TODO: deacoplate this, create another layer to abstract the mongodb crap
// This should handle only the requests without caring about the db
var Passenger = require('../models/passenger.model'),
    messages = require('../util/messages');

exports.getPassengers = function (req, res) {
    // TODO: add pagination and crap.
    Passenger.find({})
        .then(function (passengers) {
            var returnPassengers = [];
            
            passengers.forEach(function (element) {
                var newPassenger = element.toJSON();
                newPassenger.links = {};
                newPassenger.links.self = 'http://' + req.headers.host + '/api/passenger/' + element.id;
                returnPassengers.push(newPassenger);
            })
            
            res.json(returnPassengers);
        });
};

exports.getById = function (req, res) {
    Passenger.findOne({id: req.params.id})
        .then(function (passenger) {
            if (!passenger) {
                res.status(404).send(messages.passengers.notFound);
                return;
            }
            var newPassenger = passenger.toJSON();
            newPassenger.links = {};
            newPassenger.links.parent = 'http://' + req.headers.host + '/api/passenger/';

            // TODO: build cleaner
            res.json(newPassenger);
        });
};

exports.register = function (req, res) {
    var passenger = req.body;

    // TODO: Validate and stuff.
    var newPassenger = Passenger(passenger);
    newPassenger.save()
        .then(function () {
            res.status(201).send(messages.passengers.created);
        })
        .catch(function (err) {
            res.status(500).send(err.message);
        });
};

exports.login = function (req, res) {
    // TODO: hashed pwd?
    Passenger.findOne({email: req.body.email, password: req.body.password})
        .then(function (passenger) {

            if (!passenger) {
                res.status(422).send(messages.passengers.invalid);
            }
            res.status(202).send(messages.passengers.loginAccepted);

        })
        .catch(function (err) {
            res.status(500).send(err.message);
        });
};