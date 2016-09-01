var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var RouteSchema = new mongoose.Schema({
    departure: {type:String, require:true},
    destination: {type:String, require:true},
    cost: Number,
    paymentType: String,
    routeOwner:String,
    departureTime: String,
    placeAvailable: Number,
    addressDestination: String,
    passengers: Array
});

RouteSchema.plugin(autoIncrement.plugin, {model: 'Route', field: 'id', startAt: 1});

module.exports = mongoose.model('Route', RouteSchema);