var mongoose = require('mongoose'),
	tipOffschema = require('../schemas/schema_tipOff.js');

var TipOff = mongoose.model('TipOff', tipOffschema, 'tipOff');

module.exports = TipOff;