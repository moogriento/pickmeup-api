var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var RouteSchema = new mongoose.Schema({
    departure: {type:String, require:true},
    arrival: {type:String, require:true},
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