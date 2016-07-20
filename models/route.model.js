var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var RouteSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
  cost: Number,
  payment_type: String,
  departure_time: Date,
  contact: String,
  streets: Array,
  seats: Number,
  passengers: Array
});

RouteSchema.plugin(autoIncrement.plugin, {model: 'Route', field: 'id', startAt: 1});

module.exports = mongoose.model('Route', RouteSchema);