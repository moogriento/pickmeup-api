var Route = require('../models/route.model');

exports.getRoutes = function (req, res) {

  // TODO: add pagination and crap.
  Route.find({}, function (err, routes) {
    res.json(routes);
  });
};

exports.getById = function (req, res) {
  Route.find({id: req.params.id}, function (err, route) {
    if (!route || route.length === 0) {
      res.status(404).send('Route not found');
      return;
    }

    // TODO: build cleaner
    res.json(route[0]);
  });
};

exports.getByPassengerId = function (req, res) {
  Route.find({passengers: parseInt(req.params.passenger_id, 10)}, function (err, routes) {
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

  // TODO: you know, promise it as passenger
  newRoute = Route(route);
  newRoute.save(function (err) {
    if (err) {
      result.code = 666;
      result.detail = err.message;
    }
    route.id = newRoute.id;
    result.route = route;

    res.json(result);
  });
};