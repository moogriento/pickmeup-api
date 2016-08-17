var express = require('express');
var router = express.Router();
var passengerController = require('../controllers/passenger.controller.js');
// Base path is /api/passenger

router.get('/', passengerController.getPassengers)
    .get('/:id', passengerController.getById)
    .post('/', passengerController.register)
    .post('/login', passengerController.login)

module.exports = router;