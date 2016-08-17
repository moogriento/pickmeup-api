// TODO: deacoplate this, create another layer to abstract the mongodb crap
// This should handle only the requests without caring about the db
var Passenger = require('../models/passenger.model');

exports.getPassengers = function (req, res) {
  // TODO: add pagination and crap.
  Passenger.find({})
    .then(function (passengers) {
      res.json(passengers);
    });
};

exports.getById = function (req, res) {
  Passenger.findOne({id: req.params.id})
    .then(function (passenger) {
      if (!passenger) {
        res.status(404).send('Passenger not found');
        return;
      }

      // TODO: build cleaner
      res.json(passenger);
    });
};

exports.register = function (req, res) {
  var passenger = req.body;
  var result = {
    code: 0,
    detail: 'Passenger has been created',
    passenger: null
  };

  // TODO: Validate and stuff.
  newPassenger = Passenger(passenger);
  newPassenger.save()
    .then(function () {
      passenger.id = newPassenger.id;
      result.passenger = passenger;
      res.json(result);
    })
    .catch(function (err) {
      result.code = 666;
      result.detail = err.message;
      res.json(result);
    });
};

exports.login = function (req, res) {
  var result = {
    code: 0,
    detail: '',
    passenger: null
  };

  // TODO: hashed pwd?
  Passenger.findOne({username: req.body.username, password: req.body.password})
    .then(function (passenger) {

      if (!passenger) {
        result.code = 99;
        result.detail = 'Invalid username or password';
        res.json(result);
        return;
      }

      result.passenger = passenger;
      res.json(result);
    })
    .catch(function (err) {
      result.code = 666;
      result.detail = err.message;
      res.json(result);
    });
};