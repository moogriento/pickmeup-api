var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var PassengerSchema = new mongoose.Schema({
    username: {type:String, require:true, unique:true},
    first_name: String,
    last_name: String,
    email: {type:String, require:true, unique:true},
    skype_id: String,
    cellphone: {type:Number}
});

PassengerSchema.plugin(autoIncrement.plugin, {model: 'Passenger', field: 'id', startAt: 1});

module.exports = mongoose.model('Passenger', PassengerSchema);