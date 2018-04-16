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
	},
	question_answer_count: {
		type: Number,
		default: 0
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
				'question_catogery': 1,
				'question_answer_count': 1
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
				'question_catogery': 1,
				'question_answer_count': 1
			}).sort({
				'question_pv': -1
			}).limit(8).skip((params.page -1) * 8).exec(data)
		}
	},

	// 获取自己的提问
	fetchMyQuestion(params, data) {
	
		if (params.audit == 'all') {
			return this.find({'question_author': params.question_author}).exec(data);
		} else {
			return this.find({
				'question_author': params.username,
				'question_audit': params.audit
			}).exec(data)
		}	
	},

	// 更新 问题答案数量
	incAnswerCount(question_id, data) {
		return this.update({'_id': question_id}, {
			$inc: {
				'question_answer_count': 1
			}
		}).exec(data);
	},

	// 问题已解决
	solved(question_id, data) {
		return this.update({'_id': question_id}, {
			$set: {
				'question_solve': 'yes'
			}
		}).exec(data)
	},
}

module.exports = Questionschema;