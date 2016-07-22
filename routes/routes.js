var express = require('express');
var router = express.Router();
var routeController = require('../controllers/route.controller.js');
// Base path is /api/passenger

router.get('/', routeController.getRoutes);

router.get('/:id', routeController.getById);

router.get('/passenger/:id', routeController.getByPassengerId);

router.post('/', routeController.register);

module.exports = router;
