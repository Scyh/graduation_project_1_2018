var mongoose = require('mongoose');

var Questionschema = new mongoose.Schema({
	question_title: String,
	question_text: String,
	question_date: {
		type: Number
	},
	question_solve: String,
	question_pv: {
		type: Number,
		default: 0,
	},
	question_catogery: {
		type: String,
		require: true
	}

})

Questionschema.statics = {
	fetchQuestion(params, data) {
		if (params.type == 'latest') {
			return this.find({}, {
				'question_author': 1,
				'question_title': 1,
				'question_date': 1,
				'question_solve': 1,
				'question_pv': 1,
				'question_catogery': 1
			}).sort({
				'question_date': -1
			}).limit(8).skip((params.page -1) * 8).exec(data)
		} else if (params.type == 'hot') {
			return this.find({}, {
				'question_author': 1,
				'question_title': 1,
				'question_date': 1,
				'question_solve': 1,
				'question_pv': 1,
				'question_catogery': 1
			}).sort({
				'question_pv': -1
			}).limit(8).skip((params.page -1) * 8).exec(data)
		}
	}
}

module.exports = Questionschema;