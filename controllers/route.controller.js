var Route = require('../models/route.model');
var Passenger = require('../models/passenger.model');
var Promise = require('bluebird');

exports.getRoutes = function (req, res) {

  // TODO: add pagination and crap.
  Route.find({})
    .then(function (routes) {
      res.json(routes);
    });
};

exports.getById = function (req, res) {

  Route.findOne({id: req.params.id})
    .then(function (route) {
      if (!route) {
        res.status(404).send('Route not found');
        return;
      }

      // TODO: build cleaner
      res.json(route);
    })
    .catch(function (err) {
      res.json({
        code: 666,
        detail: err.message
      });
    });
};

exports.getByPassengerId = function (req, res) {
  Route.find({passengers: parseInt(req.params.passenger_id, 10)})
    .then(function (routes) {
      res.json(routes);
    });
};

exports.register = function (req, res) {
  var route = req.body;
  var result = {
    code: 0,
    detail: 'Route has been created',
    route: null
  };

  // TODO: validate data
  newRoute = Route(route);
  newRoute.save()
    .then(function () {
      route.id = newRoute.id;
      result.route = route;

      res.json(result);
    })
    .catch(function (err) {
      result.code = 666;
      result.detail = err.message;
      res.json(result);
    });
};

exports.addPassenger = function (req, res) {
  var data = req.body;
  var result = {
    code: 0,
    detail: 'Passenger has been added to the route'
  };

  Promise.resolve([
    Passenger.findOne({id: data.passenger_id}),
    Route.findOne({id: data.route_id}),
    Route.findOne({id: data.route_id, passengers: parseInt(data.passenger_id, 10)})
  ])
  .spread(function(passenger, route, routeWithPassenger) {

    if (!passenger) {
      res.json({
        code: 99,
        detail: 'Invalid passenger ID'
      });
      return;
    }

    if (!route) {
      res.json({
        code: 99,
        detail: 'Invalid route ID'
      });
      return;
    }

    if (routeWithPassenger) {
      res.json({
        code: 99,
        detail: 'Passenger has already been added to the route'
      });
      return;
    }

    Route.update({id: data.route_id}, { $push: {'passengers': data.passenger_id}}, {})
      .then(function () {
        res.json(result);
      })
      .catch(function (err) {
        result.code = 666;
        result.detail = err.message;
        res.json(result);
      });
  });
};