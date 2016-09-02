var Route = require('../models/route.model'),
    Passenger = require('../models/passenger.model'),
    Promise = require('bluebird'),
    messages = require('../util/messages');

exports.getRoutes = function (req, res) {
    // TODO: add pagination and crap.
    Route.find({})
        .then(function (routes) {
            var returnRoutes = [];
            routes.forEach(function (element) {
                var newRoute = element.toJSON();
                newRoute.links = {};
                newRoute.links.self = 'http://' + req.headers.host + '/api/routes/' + element.id;
                returnRoutes.push(newRoute);
            });

            res.json(returnRoutes);
        });
};

exports.getById = function (req, res) {
    Route.findOne({id: req.params.id})
        .then(function (route) {
            if (!route) {
                res.status(404).send(messages.routes.notFound);
                return;
            }
            var newRoute = route.toJSON();
            newRoute.links = {};
            newRoute.links.parent = 'http://' + req.headers.host + '/api/routes/';
            // TODO: build cleaner

            newRoute.links.related = {};
            newRoute.links.related.passengers = []
            newRoute.passengers.forEach(function (passenger) {
                newRoute.links.related.passengers.push({id:passenger,
                    url: 'http://' + req.headers.host + '/api/routes/passenger/' + passenger});
            });
            res.json(newRoute);
        })
        .catch(function (err) {
            res.status(500).send(err.message);
        });
};

exports.getByPassengerId = function (req, res) {
    Route.find({passengers: parseInt(req.params.passenger_id, 10)})
        .then(function (routes) {

            var returnRoutes = [];
            routes.forEach(function (element) {
                var newRoute = element.toJSON();
                newRoute.links = {};
                newRoute.links.self = 'http://' + req.headers.host + '/api/routes/' + element.id;
                returnRoutes.push(newRoute);
            });


            var newRoutePassenger = {routes:returnRoutes};
            newRoutePassenger.links = {};
            newRoutePassenger.links.related = 'http://' + req.headers.host + '/api/passenger/'+ req.params.passenger_id;
            res.json(newRoutePassenger);
     }).catch(function (err) {
        console.log(err)
    });
};

exports.register = function (req, res) {
    var route = req.body;

    // TODO: validate data
    newRoute = Route(route);
    newRoute.id = undefined;
    if(newRoute.passengers.length>3){
        res.send("Muchos pasajeros")
    }
    newRoute.passengers.push(parseInt(newRoute.routeOwner));
    newRoute.placeAvailable = 3-newRoute.passengers.length;

    newRoute.save()
        .then(function () {
            res.status(201).send(messages.routes.created);
        })
        .catch(function (err) {
            console.log(err)

            console.log(newRoute)
            res.status(500).send(err.message);
        });
};

exports.addPassenger = function (req, res) {
    var data = req.body;

    Promise.resolve([
        Passenger.findOne({id: data.passenger_id}),
        Route.findOne({id: data.route_id}),
        Route.findOne({id: data.route_id, passengers: parseInt(data.passenger_id, 10)})
    ])
        .spread(function (passenger, route, routeWithPassenger) {

            if (!passenger) {
                res.status(422).send(messages.routes.invalidPassengerId);
                return;
            }

            if (!route) {
                res.status(422).send(messages.routes.invalidRouterId);
                return;
            }

            if (routeWithPassenger) {
                res.status(422).send(messages.routes.passengerAlreadyAdded);
                return;
            }

            Route.update({id: data.route_id}, {$push: {'passengers': parseInt(data.passenger_id, 10)}}, {})
                .then(function () {
                    res.status(204).send(messages.routes.passengerAdded);
                })
                .catch(function (err) {
                    res.status(500).send(err.message);
                });
        });
};