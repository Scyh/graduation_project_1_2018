let mongoose = require('mongoose');

let Messageschema = new mongoose.Schema({
	msg_by: {
		type: String,
		require: true
	},
	msg_content: {
		type: String,
		require: true
	},
	msg_date: {
		type: Number,
		require: true
	},
	msg_status: {
		type: String,
		default: 'notRead'
	}
})

Messageschema.statics = {
	fetchMsg(page, data) {
		return this.find({}).limit(4).skip((page -1) * 4).exec(data);
	},

	fetchNotReadCount() {
		return this.find({'msg_status': 'notRead'}).count().exec(data);
	}
}

module.exports = Messageschema;