var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Answerschema = new Schema({
	answer_author: String,
	answer_text: String,
	answer_date: Number,
	answer_comments: {
		type: Array,
		default: [],
	},
	answer_adopt: {
		type: Boolean,
		default: false,
	},
	answer_belongsTo: String
})

Answerschema.statics = {
	findByBelongsTo(answer_belongsTo, data) {
		return this.find({'answer_belongsTo': answer_belongsTo}).exec(data);
	},

	// 采纳问题
	adoptAnswer(answer_id, data) {
		return this.update({'_id': answer_id}, {
			$set: {
				'answer_adopt': true
			}
		}).exec(data)
	}
}

module.exports = Answerschema