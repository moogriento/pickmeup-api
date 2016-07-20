// TODO: deacoplate this, create another layer to abstract the mongodb crap
// This should handle only the requests without caring about the db
var Passenger = require('../models/passenger.model');

exports.getPassengers = function (req, res) {
  // TODO: add pagination and crap.
  Passenger.find({}, function (err, passengers) {
    res.json(passengers);
  });
};

exports.getById = function (req, res) {
  Passenger.find({id: req.params.id}, function (err, passenger) {
    if (!passenger || passenger.length === 0) {
      res.status(404).send('Passenger not found');
      return;
    }

    // TODO: build cleaner
    res.json(passenger[0]);
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
  // TODO: promise it!!!!!!!!! promise-mongo
  newPassenger = Passenger(passenger);
  newPassenger.save(function (err) {
    if (err) {
      result.code = 666;
      result.detail = err.message;
    }
    passenger.id = newPassenger.id;
    result.passenger = passenger;

    res.json(result);
  });
};