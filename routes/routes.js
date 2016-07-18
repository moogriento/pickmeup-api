var express = require('express');
var router = express.Router();
var routeController = require('../controllers/route.controller.js');
// Base path is /api/passenger

router.get('/list', routeController.getRoutes);

router.get('/:id', routeController.getById);

router.get('/passenger/:passenger_id', routeController.getByPassengerId);

router.post('/register', routeController.register);

module.exports = router;
