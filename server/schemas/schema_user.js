var mongoose = require('mongoose');

// 建模
var Userschema = new mongoose.Schema({
	username: String,
	password: String,

	// 禁言 -> 1代表正常 0代表禁言
	permission: {
		type: Number,
		default: 1
	}
})

Userschema.statics = {
	checkUser: function(params, data) {
		// console.log()
		return this.find({'username': params.username,'password': params.password}).count().exec(data);
	},

	uniqueUserName: function(params, data) {
		return this.find({'username': params.username}).count().exec(data);
	},
}

module.exports = Userschema