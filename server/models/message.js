var mongoose = require('mongoose'),
	Messageschema = require('../schemas/schema_message.js');

var Message = mongoose.model('Message', Messageschema, 'message')

module.exports = Message;