var mongoose = require('mongoose'),
	Userschema = require('../schemas/schema_user.js');

var User = mongoose.model('User', Userschema, 'User');

module.exports = User;