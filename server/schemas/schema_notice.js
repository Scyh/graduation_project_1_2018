var mongoose = require('mongoose'),

var Noticeschema = new mongoose.Schema({
	_notice_user_id: {
		type: String,
		require: true
	},
	notice_user: {
		type: String,
		require: true
	},
	notice: {
		type: Array,
		default: []
	}
})

module.exports = Noticeschema;