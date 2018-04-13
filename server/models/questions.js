var mongoose = require('mongoose'),
	Questionschema = require('../schemas/schema_question.js');

var Question = mongoose.model('Question',Questionschema,'question');

module.exports = Question;