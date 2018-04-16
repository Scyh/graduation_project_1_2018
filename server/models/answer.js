var mongoose = require('mongoose'),
	Answerschema = require('../schemas/schema_answer.js');

var Answer = mongoose.model('Answer',Answerschema,'answer');

module.exports = Answer;