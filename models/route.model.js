var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var RouteSchema = new mongoose.Schema({
    departure: {type:String, require:true, enum: ['BELATRIX_SAN_ISIDRO', 'BELATRIX_LA_MOLINA']},
    arrival: {type:String, require:true, enum: ['SAN_ISIDRO', 'LINCE', 'CALLAO', 'CHORRILLOS', 'SAN_BORJA', 'CERCADO_DE_LIMA']},
    cost: Number,
    payment_type: String,
    routeOwner: String,
    departure_time: { type: Date, default: Date.now },
    placeAvailable: Number,
    seats: String,
    addess_destination: Array
});

RouteSchema.plugin(autoIncrement.plugin, {model: 'Route', field: 'id', startAt: 1});

module.exports = mongoose.model('Route', RouteSchema);