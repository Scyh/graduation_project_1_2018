var mongoose = require('mongoose'),
	Noticeschema = require('../schemas/schema_notice.js');

var Notice = mongoose.model('Notice', Noticeschema, 'notice');

module.exports = Notice;