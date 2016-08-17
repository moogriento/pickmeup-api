var express = require('express');
var router = express.Router();
var routeController = require('../controllers/route.controller.js');
// Base path is /api/routes

router.get('/', routeController.getRoutes);

router.get('/:id', routeController.getById);

router.get('/passenger/:passenger_id', routeController.getByPassengerId);

router.post('/', routeController.register);

router.post('/add', routeController.addPassenger);

module.exports = router;
