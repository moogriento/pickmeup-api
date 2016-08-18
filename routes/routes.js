var express = require('express');
var router = express.Router();
var routeController = require('../controllers/route.controller.js');
// Base path is /api/routes

router.get('/', routeController.getRoutes)
    .get('/:id', routeController.getById)
    .get('/passenger/:passenger_id', routeController.getByPassengerId)
    .post('/', routeController.register)
    .post('/add', routeController.addPassenger);

module.exports = router;
