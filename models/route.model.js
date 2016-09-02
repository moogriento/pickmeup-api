var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var RouteSchema = new mongoose.Schema({
    departure: {type:String, require:true, enum: ['BELATRIX_SAN_ISIDRO', 'BELATRIX_LA_MOLINA']},
    destination: {type:String, require:true, enum: ['SAN_ISIDRO', 'LINCE', 'CALLAO', 'CHORRILLOS', 'SAN_BORJA', 'CERCADO_DE_LIMA']},
    cost: Number,
    paymentType: String,
    routeOwner:String,
    departureTime: Number,
    placeAvailable: Number,
    addressDestination: String,
    passengers: Array
});

RouteSchema.plugin(autoIncrement.plugin, {model: 'Route', field: 'id', startAt: 1});

module.exports = mongoose.model('Route', RouteSchema);