var express = require('express');
var router = express.Router();
var passengerController = require('../controllers/passenger.controller.js');
// Base path is /api/passenger

router.get('/', passengerController.getPassengers);

router.get('/:id', passengerController.getById);

router.post('/', passengerController.register);

router.post('/login', passengerController.login);

module.exports = router;