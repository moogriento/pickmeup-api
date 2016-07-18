var express = require('express');
var router = express.Router();
var passengerController = require('../controllers/passenger.controller.js');
// Base path is /api/passenger

router.get('/list', passengerController.getPassengers);

router.get('/:id', passengerController.getById);

router.post('/register', passengerController.register);

module.exports = router;