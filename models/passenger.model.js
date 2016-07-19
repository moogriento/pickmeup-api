var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var PassengerSchema = new mongoose.Schema({
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  skype_id: String,
  cellphone: Number
});

PassengerSchema.plugin(autoIncrement.plugin, {model: 'Passenger', field: 'id', startAt: 1});

module.exports = mongoose.model('Passenger', PassengerSchema);